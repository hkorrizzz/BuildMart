import { useEffect } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import "./notification.css";

export const Toast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="toast-notification">
            <div className="toast-content">
                <LuCheck className="toast-icon" />
                <span>{message}</span>
            </div>
            <button className="toast-close" onClick={onClose}>
                <LuX />
            </button>
        </div>
    );
};