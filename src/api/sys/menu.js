import { request } from '@/utils/request';

/**
 * 获取菜单详情
 * @param {*} id 
 * @returns
 */
export async function getMenuDetail(id) {
    const resp = await request({
        url: `/sys/menu/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加菜单
 * @param {*} menuInfo 
 *  @param {*} name 菜单名称
 *  @param {*} permission 权限表达式
 *  @param {*} parentId 上级菜单
 *  @param {*} icon 菜单图标
 *  @param {*} activeMenu 选中路由名称
 *  @param {*} isFrame 是否外联
 *  @param {*} frameSrc 外部链接地址
 *  @param {*} isAffix 是否开启固定多页签
 *  @param {*} status 菜单状态 0停用 1正常
 *  @param {*} isAlwaysShow 简化路由 0关闭 1开启
 *  @param {*} isCache 是否缓存 0否 1是
 *  @param {*} type 菜单类型 0目录 1菜单 2按钮
 *  @param {*} openType 打开方式 0当前窗口 1打开新窗口
 *  @param {*} sort 显示排序
 *  @param {*} routeComponent 路由对应组件路径
 *  @param {*} routePath 路由访问地址
 *  @param {*} routeName 路由名称
 *  @param {*} routeRedirect 路由重定向
 *  @param {*} tenantId 租户id
 * 
 */
export async function addMenu(menuInfo) {
    const {
        name,
        permission,
        parentId,
        icon,
        activeMenu,
        isFrame,
        frameSrc,
        isAffix,
        status,
        isAlwaysShow,
        isCache,
        type,
        openType,
        sort,
        routeComponent,
        routePath,
        routeName,
        routeRedirect,
        tenantId
    } = menuInfo;

    const resp = await request({
        url: "/sys/menu/add",
        method: "post",
        data: {
            name,
            permission,
            parentId,
            icon,
            activeMenu,
            isFrame,
            frameSrc,
            isAffix,
            status,
            isAlwaysShow,
            isCache,
            type,
            openType,
            sort,
            routeComponent,
            routePath,
            routeName,
            routeRedirect,
            tenantId
        }
    });
    return resp.data;
}

/**
 * 编辑菜单
 * @param {*} menuInfo 
 *  @param {*} name 菜单名称
 *  @param {*} permission 权限表达式
 *  @param {*} parentId 上级菜单
 *  @param {*} icon 菜单图标
 *  @param {*} activeMenu 选中路由名称
 *  @param {*} isFrame 是否外联
 *  @param {*} frameSrc 外部链接地址
 *  @param {*} isAffix 是否开启固定多页签
 *  @param {*} status 菜单状态 0停用 1正常
 *  @param {*} isAlwaysShow 简化路由 0关闭 1开启
 *  @param {*} isCache 是否缓存 0否 1是
 *  @param {*} type 菜单类型 0目录 1菜单 2按钮
 *  @param {*} openType 打开方式 0当前窗口 1打开新窗口
 *  @param {*} sort 显示排序
 *  @param {*} routeComponent 路由对应组件路径
 *  @param {*} routePath 路由访问地址
 *  @param {*} routeName 路由名称
 *  @param {*} routeRedirect 路由重定向
 *  @param {*} tenantId 租户id
 * @param {*} id 
 * @returns 
 */
export async function editMenu(menuInfo, id) {
    const {
        name,
        permission,
        parentId,
        icon,
        activeMenu,
        isFrame,
        frameSrc,
        isAffix,
        status,
        isAlwaysShow,
        isCache,
        type,
        openType,
        sort,
        routeComponent,
        routePath,
        routeName,
        routeRedirect,
        tenantId
    } = menuInfo;

    const resp = await request({
        url: "/sys/menu/edit",
        method: "post",
        data: {
            name,
            permission,
            parentId,
            icon,
            activeMenu,
            isFrame,
            frameSrc,
            isAffix,
            status,
            isAlwaysShow,
            isCache,
            type,
            openType,
            sort,
            routeComponent,
            routePath,
            routeName,
            routeRedirect,
            tenantId,
            id,
        }
    });
    return resp.data;
}



/**
 * 删除菜单（可支持批量删除）
 * @param {*} ids 
 */
export async function deleteMenu(ids) {
    const resp = await request({
        url: "/sys/menu/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}
