class storage {
    constructor() {
        this.source = window.localStorage;
        this.initClear();
    }

    /**
     * 初始化清除已经过期的数据
     */
    initClear() {
        // const reg = new RegExp("__expires__");
        const reg = /__expires__/;
        let data = this.source;
        let list = Object.keys(data);
        if (list.length > 0) {
            list.forEach((key) => {
                // 如果为非包含__expires__键名的key进行判断清除过期的
                if (!reg.test(key)) {
                    let now = Date.now();
                    let expires = data[`${key}__expires__`];
                    if (now >= expires) {
                        this.remove(key);
                    }
                }
            })
        };
    }

    /**
     * set 存储方法
     * @ param {String}     key 键名
     * @ param {String}     value 键值
     * @ param {String}     expired 过期时间，以分钟为单位，非必须。（不传则为永久有效）
     */
    set(key, value, expired) {
        let source = this.source;
        source[key] = JSON.stringify(value);
        if (expired !== undefined) {
            // // 过期时间单位为天
            // source[`${key}__expires__`] = Date.now() + 1000 * 60 * 60 * 24 * expired
            // // 过期时间单位为小时
            // source[`${key}__expires__`] = Date.now() + 1000 * 60 * 60 * expired
            // 过期时间单位为分钟
            source[`${key}__expires__`] = Date.now() + 1000 * 60 * expired;
        };
    }

    /**
     * get 获取方法
     * @ param {String}     key 键名
     * @ return  如果没过期则返回数据，否则返回null
     */
    get(key) {
        const source = this.source;
        const expires = source[`${key}__expires__`];
        // 获取前把已经过期的数据删除掉
        if (expires) {
            const now = Date.now();
            if (now >= expires) {
                this.remove(key);
                return null;
            }
        }
        // 获取数据
        const value = source[key] ? JSON.parse(source[key]) : null;
        return value;
    }

    /**
     * remove 删除方法
     * @ param {String}     key 键名  非必须 （不传则删除所有）
     */
    remove(key) {
        if (key) {
            // localStorage自带的removeItem()方法
            this.source.removeItem(key);
            this.source.removeItem(`${key}__expires__`);
            // delete data[key];
            // delete data[`${key}__expires__`];
        } else {
            // 清除所有，localStorage自带的clear()方法
            this.source.clear();
        }
    }
}

export default new storage()