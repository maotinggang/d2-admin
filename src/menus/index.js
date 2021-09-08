import { Menu, menuValue } from 'd2-admin/utils/menu.js'

export const menusAside = menuValue([
  new Menu('演示')
    .icon('fluent:phone-vertical-scroll-24-filled')
    .add(
      new Menu('文档')
        .scope('/dashboard/document')
        .add(new Menu('doc-1').url('/page1'))
        .add(new Menu('doc-2').url('/page2'))
        .add(new Menu('doc-3').url('/page3'))
    )
    .add(
      new Menu('组件')
        .scope('/dashboard/demo/component')
        .add(
          new Menu('滚动容器')
            .url('/scrollbar')
            .icon('fluent:phone-vertical-scroll-24-filled')
        )
    )
])
