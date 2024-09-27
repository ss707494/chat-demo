import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = '我的项目' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        {/* 添加头部内容 */}
      </header>
      <main>{children}</main>
      <footer>
        {/* 添加底部内容 */}
      </footer>
    </>
  );
};

export default Layout;