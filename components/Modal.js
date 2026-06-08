import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Lightweight drop-in replacements for @reach/dialog's DialogOverlay / DialogContent.
// Same contract: <DialogOverlay isOpen onDismiss><DialogContent aria-label>...</DialogContent></DialogOverlay>
// Both forward className so styled(DialogOverlay) / styled(DialogContent) keep working unchanged.

export function DialogOverlay({ isOpen, onDismiss, children, className, ...rest }) {
    // close on Escape and lock body scroll while open
    useEffect(() => {
        if (!isOpen) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') onDismiss?.();
        };
        window.addEventListener('keydown', onKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onDismiss]);

    if (!isOpen || typeof document === 'undefined') return null;

    // dismiss when the click lands outside the dialog panel (e.g. on the backdrop),
    // regardless of any intermediate overlay/backdrop elements
    const handleMouseDown = (e) => {
        if (!e.target.closest('[role="dialog"]')) onDismiss?.();
    };

    return createPortal(
        <div className={className} onMouseDown={handleMouseDown} {...rest}>
            {children}
        </div>,
        document.body,
    );
}

export function DialogContent({ children, className, ...rest }) {
    const ref = useRef(null);

    // move focus into the dialog when it opens
    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <div ref={ref} className={className} role='dialog' aria-modal='true' tabIndex={-1} {...rest}>
            {children}
        </div>
    );
}
