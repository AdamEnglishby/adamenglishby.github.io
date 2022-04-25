const getParam = (param) => {
    return new URLSearchParams(window.location.search).get(param);
};

const randBetween = (value, c, d) => {
    value = (value) / (4332272522);
    return c + value * (d - c);
};

const seed = (k) => {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < k.length; i++) {
        h = Math.imul(h ^ k.charCodeAt(i), 16777619);
    }
    return () => {
        h += h << 13;
        h ^= h >>> 7;
        h += h << 3;
        h ^= h >>> 17;
        return (h += h << 5) >>> 0;
    }
};

const $ = (elem) => {
    return document.getElementById(elem);
};