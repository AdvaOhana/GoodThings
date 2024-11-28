const routes = [
    { path: `/`, page: () => import('../pages/Home.js') },
    { path: `/tovit/form`, page: () => import('../components/tovitForm.js') },
    { path: `/login`, page: () => import('../pages/Login.js') },
    { path: `/signup`, page: () => import('../pages/Signup.js') },
    { path: `/*`, page: () => import('../pages/Home.js') },
    // { path: `/*`, page: () => import('../pages/NotFound.js') },
]

function matchRoute(url) {
    return routes.find(route => route.path === url)
}

export async function renderView(url) {
    const foundRoute = matchRoute(url || location.pathname)

    if (!foundRoute) {
        const notFound = routes.find(route => route.path === '/*')
        const module = await notFound.page()
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

