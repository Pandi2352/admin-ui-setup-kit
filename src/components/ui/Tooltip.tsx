import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactElement<any>; // Use any to allow standard HTML attributes
  side?: 'right' | 'top' | 'bottom' | 'left';
  offset?: number;
}

export const Tooltip = ({ content, children, side = 'right', offset = 10 }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const childRef = useRef<HTMLElement>(null);

    const updatePosition = () => {
        if (!childRef.current) return;
        const rect = childRef.current.getBoundingClientRect();
        
        let top = 0;
        let left = 0;

        switch (side) {
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right + offset;
                break;
            case 'left':
                top = rect.top + rect.height / 2;
                left = rect.left - offset;
                break;
            case 'top':
                top = rect.top - offset;
                left = rect.left + rect.width / 2;
                break;
            case 'bottom':
                top = rect.bottom + offset;
                left = rect.left + rect.width / 2;
                break;
        }

        setCoords({ top, left });
    };

    const handleMouseEnter = () => {
        updatePosition();
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    // Clone child to attach events and ref
    const trigger = React.cloneElement(children, {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouseEnter();
            children.props.onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouseLeave();
            children.props.onMouseLeave?.(e);
        },
        ref: (node: HTMLElement) => {
            childRef.current = node;
            // Handle existing refs if any
            const { ref } = children as any;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }
    });

    return (
        <>
            {trigger}
            {isVisible && createPortal(
                <div 
                    className="fixed z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg whitespace-nowrap pointer-events-none transform -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200"
                    style={{ top: coords.top, left: coords.left }}
                >
                    {content}
                    {side === 'right' && (
                        <div className="absolute top-1/2 -left-1 w-2 h-2 bg-gray-900 transform -translate-y-1/2 rotate-45" />
                    )}
                </div>,
                document.body
            )}
        </>
    );
};
