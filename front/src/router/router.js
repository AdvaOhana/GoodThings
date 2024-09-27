const routes = [
    { path: `/`, page: () => import('../pages/Home.js') },
    { path: `/tovit/form`, page: () => import('../components/tovitForm.js') },
    { path: `/login`, page: () => import('../pages/Login.js') },
    { path: `/signup`, page: () => import('../pages/Login.js') },
    { path: `/*`, page: () => import('../pages/NotFound.js') },
]


function matchRoute() {

    return routes.find(route => `${route.path}` === location.pathname)
}

export async function renderView() {
    const foundRoute = matchRoute()

    if (!foundRoute) {
        const foundRoute = routes.find(route => route.path === '/*')
        const module = await foundRoute.page()
        module.default()
        return
    }

    const module = await foundRoute.page()
    module.default()
}

function navTo(url) {
    history.pushState(null, null, url)
    renderView()
}



document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navTo(e.target.href)
    }
})

