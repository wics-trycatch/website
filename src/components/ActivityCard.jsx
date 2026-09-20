import { useEffect, useRef, useState } from 'react';

const MAX_PHOTO_DIM = 1280; // resized before upload so it's fast on event wifi

// Shrinks + JPEG-compresses a captured photo client-side and resolves with
// a data URL, small enough to send along in a normal JSON POST.
function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, MAX_PHOTO_DIM / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read photo')); };
    img.src = url;
  });
}

// A real, in-person Try/CATCH-day task, not trivia. The text/no-input ones
// are honor system — but tasks that are inherently visual (proof: 'photo')
// require an actual photo taken right there, which gets uploaded along with
// the submission so the team can review it later without anyone needing to
// check in person during the event.
export default function ActivityCard({ square, activity, ladderTo, final, onDone }) {
  const [answer, setAnswer] = useState('');
  const [photo, setPhoto] = useState(null); // compressed data URL — both the preview and what gets sent
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const card = useRef(null);
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  const needsText = activity.proof === 'text' || activity.proof === 'both';
  const needsPhoto = activity.proof === 'photo' || activity.proof === 'both';

  useEffect(() => (needsText ? inputRef.current : card.current)?.focus(), []);

  const tag = final
    ? '🏁 Final challenge'
    : ladderTo
    ? `🪜 Bonus! Do this and climb to square ${ladderTo}`
    : 'Go do this!';

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setPhoto(await compressPhoto(file));
    } finally {
      setUploading(false);
    }
  };

  const canSubmit =
    (!needsPhoto || (!!photo && !uploading)) && (!needsText || answer.trim().length > 0);

  const submit = (e) => {
    e?.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const finish = () => {
    onDone({
      text: needsText ? answer : '[see photo]',
      photoDataUrl: needsPhoto ? photo : null,
    });
  };

  return (
    <div className="sl-scrim">
      <div className="sl-card" ref={card} tabIndex={-1} role="group" aria-label={`Activity for square ${square}`}>
        <div className="sl-tag">Square {square} · {tag}</div>
        <h2 className="sl-q">{activity.title}</h2>
        <p className="sl-detail">{activity.detail}</p>

        {!submitted ? (
          <form onSubmit={submit}>
            {needsText && (
              <input
                ref={inputRef}
                className="sl-input"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={activity.inputLabel}
                aria-label={activity.inputLabel}
                maxLength={140}
              />
            )}

            {needsPhoto && (
              <>
                <input
                  ref={fileRef}
                  className="sl-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={onFile}
                />
                {!photo ? (
                  <button type="button" className="sl-btn" onClick={() => fileRef.current?.click()} disabled={uploading}>
                    {uploading ? 'Processing…' : '📷 Take a photo'}
                  </button>
                ) : (
                  <div className="sl-photo-preview">
                    <img src={photo} alt="What you captured" />
                    <button type="button" className="sl-btn" onClick={() => fileRef.current?.click()}>
                      Retake
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="sl-actions">
              <button type="submit" className="sl-btn sl-btn-primary" disabled={!canSubmit}>
                {final ? 'I found it! 🏆' : 'Mark as done ✅'}
              </button>
            </div>
          </form>
        ) : (
          <div className="sl-feedback good" role="status">
            <p>
              <strong>Nice, logged!</strong>{' '}
              {ladderTo
                ? `Climbing the ladder to square ${ladderTo}…`
                : final
                ? "You're all done — the team will review entries after the event!"
                : 'Onward.'}
            </p>
            <button type="button" className="sl-btn sl-btn-primary" autoFocus onClick={finish}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
