/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import Content from '@theme-original/Navbar/Content';
import type ContentType from '@theme/Navbar/Content';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';
import {
  useThemeConfig,
  ErrorCauseBoundary,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
// 样式从原始组件继承，不需要单独导入

type Props = WrapperProps<typeof ContentType>;

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function ContentWrapper(props: Props): ReactNode {
  const location = useLocation();
  const isProduct2 = location.pathname.startsWith('/product2');
  const mobileSidebar = useNavbarMobileSidebar();
  const {navbar} = useThemeConfig();

  // 调试：输出当前路径和判断结果
  if (typeof window !== 'undefined') {
    console.log('当前路径:', location.pathname);
    console.log('是 Product 2 页面?', isProduct2);
  }

  // 获取所有导航项
  const allItems = navbar.items as NavbarItemConfig[];

  // 如果是 Product 2 页面，过滤导航项
  let items: NavbarItemConfig[];
  if (isProduct2) {
    // 找到产品切换下拉并修改其 label
    const productDropdown = allItems.find(
      (item) => item.type === 'dropdown' && item.label === 'Docusaurus',
    );
    const modifiedDropdown = productDropdown
      ? {
          ...productDropdown,
          label: 'Product 2', // 修改为 Product 2
        }
      : null;

    // Product 2 页面：只显示 Product 2 相关的导航项
    items = [
      // 保留并修改产品切换下拉
      ...(modifiedDropdown ? [modifiedDropdown] : []),
      // Product 2 专属导航项
      {
        type: 'doc',
        position: 'left' as const,
        docId: 'home',
        docsPluginId: 'product2',
        label: 'Overview',
      },
      {
        type: 'docSidebar',
        position: 'left' as const,
        sidebarId: 'product2Sidebar',
        docsPluginId: 'product2',
        label: 'Getting Started',
      },
      {
        type: 'docSidebar',
        position: 'left' as const,
        sidebarId: 'product2Sidebar',
        docsPluginId: 'product2',
        label: 'API Reference',
      },
      // 保留右侧的搜索、版本等
      ...allItems.filter((item) => item.position === 'right'),
    ];
  } else {
    // 其他页面：显示默认导航（但排除 Product 2 专属项）
    items = allItems.filter(
      (item) =>
        !('docsPluginId' in item) ||
        (item as {docsPluginId?: string}).docsPluginId !== 'product2',
    );
  }

  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');

  // 如果是 Product 2，完全自定义渲染
  if (isProduct2) {
    return (
      <NavbarContentLayout
        left={
          <>
            {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
            <NavbarLogo />
            <NavbarItems items={leftItems} />
          </>
        }
        right={
          <>
            <NavbarItems items={rightItems} />
            <NavbarColorModeToggle />
            {!searchBarItem && (
              <NavbarSearch>
                <SearchBar />
              </NavbarSearch>
            )}
          </>
        }
      />
    );
  }

  // 其他页面使用默认组件
  return <Content {...props} />;
}
