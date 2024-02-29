const comp = import.meta.globEager('./*.vue');
export default {
    install(Vue) { 
        Object.keys(comp).forEach((key) => { 
            const components = comp[key].default;
            Vue.component(components.name,components);
        });
    }
}
