//this file is put in the google sheets as well

const SHEET_NAME = 'Responses';
const PHOTOS_FOLDER_NAME = 'Snakes and Ladders Photos';

const SQUARE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15];
const FIXED_COLS = ['Name', 'Status', 'Last Updated']; // before the square columns
const PHOTOS_COL_LABEL = 'Photos';

const NAME_COL = 1;
const STATUS_COL = 2;
const UPDATED_COL = 3;
const FIRST_SQUARE_COL = FIXED_COLS.length + 1; // 4
const PHOTOS_COL = FIXED_COLS.length + SQUARE_NUMBERS.length + 1; // 17

function headerRow() {
  return [
    ...FIXED_COLS,
    ...SQUARE_NUMBERS.map((n) => (n === 15 ? 'Square 15 (Finale)' : `Square ${n}`)),
    PHOTOS_COL_LABEL,
  ];
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  const isNew = !sheet;
  if (isNew) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headerRow());
    styleSheet(sheet);
  }
  return sheet;
}

// One-time cosmetic pass: brand-colored header, frozen header/name column,
// sensible column widths, wrapped square cells, and zebra striping so a
// reviewer can actually scan this at the end of the event.
function styleSheet(sheet) {
  const headers = headerRow();
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#492A8D')
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('center');

  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);

  sheet.setColumnWidth(NAME_COL, 150);
  sheet.setColumnWidth(STATUS_COL, 110);
  sheet.setColumnWidth(UPDATED_COL, 130);
  for (let i = 0; i < SQUARE_NUMBERS.length; i++) {
    sheet.setColumnWidth(FIRST_SQUARE_COL + i, 220);
  }
  sheet.setColumnWidth(PHOTOS_COL, 260);

  // Room to grow — pre-format the next couple hundred rows so new entries
  // inherit wrapping/alignment without needing to be re-styled each time.
  const bodyRange = sheet.getRange(2, 1, 300, headers.length);
  bodyRange.setWrap(true).setVerticalAlignment('top').setFontSize(10);
  sheet.getRange(2, STATUS_COL, 300, 1).setHorizontalAlignment('center');
  sheet.getRange(2, UPDATED_COL, 300, 1).setHorizontalAlignment('center').setNumberFormat('mmm d, h:mm am/pm');

  // Zebra striping over the same range, re-applied safely if it already exists.
  const existingBandings = sheet.getBandings();
  existingBandings.forEach((b) => b.remove());
  bodyRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);

  // WINNER rows get a bold green status cell; everything else stays neutral.
  const statusRange = sheet.getRange(2, STATUS_COL, 300, 1);
  const rules = sheet.getConditionalFormatRules().filter((r) => {
    const ranges = r.getRanges();
    return !ranges.some((rg) => rg.getColumn() === STATUS_COL);
  });
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('WINNER')
      .setBackground('#c6f0d5')
      .setFontColor('#0c1821')
      .setBold(true)
      .setRanges([statusRange])
      .build()
  );
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('In progress')
      .setBackground('#f4f0ff')
      .setFontColor('#492A8D')
      .setRanges([statusRange])
      .build()
  );
  sheet.setConditionalFormatRules(rules);
}

function normalizeName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

// Row index (1-based, matching the sheet) of an existing player, or -1.
function findRowForName(sheet, name) {
  const target = normalizeName(name);
  if (!target) return -1;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  const names = sheet.getRange(2, NAME_COL, lastRow - 1, 1).getValues();
  for (let i = 0; i < names.length; i++) {
    if (normalizeName(names[i][0]) === target) return i + 2;
  }
  return -1;
}

function squareColumnIndex(square) {
  const i = SQUARE_NUMBERS.indexOf(Number(square));
  if (i === -1) return -1;
  return FIRST_SQUARE_COL + i;
}

// Top-level entry point: never let ANYTHING throw all the way out
// unhandled. Whatever fails, the real error gets written straight into an
// "Errors" tab in the spreadsheet so it's visible just by opening the
// sheet — no need to dig through the Apps Script executions UI at all.
function doPost(e) {
  try {
    return handleSubmission(e);
  } catch (err) {
    logError('doPost', err, e);
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err && err.message) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function logError(where, err, e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Where', 'Message', 'Stack', 'Raw body']);
    sheet.appendRow([
      new Date(),
      where,
      err && err.message,
      err && err.stack,
      e && e.postData && e.postData.contents,
    ]);
  } catch (e2) {
    // if even this fails there's nothing more we can do
  }
}

function handleSubmission(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = getSheet();
  const name = String(data.name || '').trim();
  if (!name) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'missing name' })).setMimeType(ContentService.MimeType.JSON);
  }

  let row = findRowForName(sheet, name);
  if (row === -1) {
    const blank = new Array(headerRow().length).fill('');
    blank[NAME_COL - 1] = name;
    sheet.appendRow(blank);
    row = sheet.getLastRow();
  }

  const isWinner = data.result === 'WINNER';
  sheet.getRange(row, STATUS_COL).setValue(isWinner ? 'WINNER 🏆' : 'In progress');
  sheet.getRange(row, UPDATED_COL).setValue(new Date());

  const cellText = data.activity ? `${data.activity}${data.answer ? ' — ' + data.answer : ''}` : (data.answer || '');
  const colIndex = squareColumnIndex(data.square);
  if (colIndex !== -1 && cellText) {
    sheet.getRange(row, colIndex).setValue(cellText);
  }

  if (data.photoDataUrl) {
    // Never let a photo-saving failure (Drive quota, auth, whatever) wipe
    // out an otherwise-successful submission, and never let it fail
    // silently either — write the actual error into the Photos cell AND
    // the Errors tab so it's visible instead of just staying blank.
    try {
      const photoUrl = savePhoto(data.photoDataUrl, name, data.square);
      if (photoUrl) appendPhotoLink(sheet, row, `Sq${data.square}`, photoUrl);
    } catch (err) {
      logError('savePhoto/appendPhotoLink', err, e);
      appendPhotoLink(sheet, row, `Sq${data.square} ⚠️ ${err.message}`, '');
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

// Adds one more clickable link to the player's Photos cell without
// overwriting the ones already there, so a player with several photo tasks
// ends up with all of them in a single readable cell.
function appendPhotoLink(sheet, row, label, url) {
  const cell = sheet.getRange(row, PHOTOS_COL);
  const existing = cell.getRichTextValue();
  const builder = SpreadsheetApp.newRichTextValue();

  const prevText = existing ? existing.getText() : '';
  const separator = prevText ? '   ' : '';
  const fullText = prevText + separator + label;
  builder.setText(fullText);

  // A brand-new, never-written cell still returns a RichTextValue from
  // getRichTextValue() — just with a single zero-length run. Copying a
  // zero-length run's style/link throws "Illegal argument", so only copy
  // runs that actually cover characters.
  if (existing && prevText.length > 0) {
    const runs = existing.getRuns();
    runs.forEach((run) => {
      const startOffset = run.getStartIndex();
      const endOffset = run.getEndIndex();
      if (endOffset <= startOffset) return;
      const linkUrl = run.getLinkUrl();
      const style = run.getTextStyle();
      builder.setTextStyle(startOffset, endOffset, style);
      if (linkUrl) builder.setLinkUrl(startOffset, endOffset, linkUrl);
    });
  }

  const labelStart = fullText.length - label.length;
  if (url) builder.setLinkUrl(labelStart, fullText.length, url);
  builder.setTextStyle(
    labelStart,
    fullText.length,
    SpreadsheetApp.newTextStyle().setForegroundColor(url ? '#492A8D' : '#c0392b').setBold(true).build()
  );

  cell.setRichTextValue(builder.build());
}

function savePhoto(dataUrl, name, square) {
  const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl);
  if (!match) return '';
  const mime = match[1];
  const base64 = match[2];
  const bytes = Utilities.base64Decode(base64);
  const safeName = String(name || 'player').replace(/[^a-z0-9]+/gi, '-');
  const blob = Utilities.newBlob(bytes, mime, `${safeName}-square${square || ''}-${Date.now()}.jpg`);
  const folders = DriveApp.getFoldersByName(PHOTOS_FOLDER_NAME);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(PHOTOS_FOLDER_NAME);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}
