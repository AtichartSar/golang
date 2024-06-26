'use client';
import { MAIN_COLOR, WHITE_COLOR } from '@/config/color';
import { ConfigProvider } from 'antd';
import React, { ReactNode } from 'react';
interface IAntdTheme {
  children: ReactNode;
}

const AntdTheme = ({ children }: IAntdTheme) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerColor: WHITE_COLOR,
            headerBg: MAIN_COLOR,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdTheme;
