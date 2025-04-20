import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface CustomScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  autoHide?: boolean;
  autoHeight?: boolean;
  autoHeightMin?: number | string;
  autoHeightMax?: number | string;
}

const CustomScrollArea: React.FC<CustomScrollAreaProps> = ({
  children,
  className = '',
  style = {},
  autoHide = true,
  autoHeight = false,
  autoHeightMin = 0,
  autoHeightMax = 200,
}) => {
  return (
    <div className={className}>
      <Scrollbars
        autoHide={autoHide}
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight={autoHeight}
        autoHeightMin={autoHeightMin}
        autoHeightMax={autoHeightMax}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
            }}
          />
        )}
        renderThumbHorizontal={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
            }}
          />
        )}
        renderTrackVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'transparent',
              right: 0,
              bottom: 0,
              top: 0,
              borderRadius: '6px',
              width: '8px',
            }}
          />
        )}
        renderTrackHorizontal={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'transparent',
              height: '8px',
              borderRadius: '6px',
            }}
          />
        )}
        style={{ ...style }}
      >
        {children}
      </Scrollbars>
    </div>
  );
};

export default CustomScrollArea;