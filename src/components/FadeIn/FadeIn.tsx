import React, { useEffect, useRef, ReactNode, cloneElement, isValidElement } from 'react';
import gsap from 'gsap';
import './fadeIn.scss';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  distance?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  className = '',
  distance = 20
}) => {
  const elementRef = useRef<HTMLElement>(null);

  // We need to get the first child as a React element to apply the ref
  const child = React.Children.only(children);

  useEffect(() => {
    if (!elementRef.current) return;

    // Set initial state
    let initialProps = { opacity: 0 };

    // Add direction-based transform
    switch (direction) {
      case 'up':
        initialProps = { ...initialProps, y: distance };
        break;
      case 'down':
        initialProps = { ...initialProps, y: -distance };
        break;
      case 'left':
        initialProps = { ...initialProps, x: distance };
        break;
      case 'right':
        initialProps = { ...initialProps, x: -distance };
        break;
      default:
        break;
    }

    // Set initial state
    gsap.set(elementRef.current, initialProps);

    // Animate to visible state
    gsap.to(elementRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power2.out'
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(elementRef.current);
    };
  }, [delay, duration, direction, distance]);

  // Clone the child element and attach our ref to it
  if (isValidElement(child)) {
    // Cast the child to React.ReactElement to access its props safely
    const typedChild = child as React.ReactElement;
    return cloneElement(typedChild, {
      ref: elementRef,
      className: `${typedChild.props.className || ''} ${className}`.trim()
    });
  }

  // Fallback if child is not a valid element
  return <>{children}</>;
};

export default FadeIn;