export async function test() {
    const name = arguments[0];
    const fn = typeof arguments[1] === "function" ? arguments[1] : arguments[2];
    const o = typeof arguments[1] === "object" ? arguments[1] : {};

    if (o.skip) {
        return await bunTest.skip(name, () => {});
    }
    const mod = await import("bun:test");
    //console.log(mod);

    const bunTest = mod.test;

    bunTest(name, async () => {
        let test = void (0);
        let close = () => {};

        const done = new Promise((resolve, reject) => {
            let closed = false;

            close = () => {
                if (closed) {
                    return;
                }

                closed = true;
                resolve(0);
            };

            test = fn({}, (e) => {
                if (closed) {
                    return;
                }

                closed = true;
                if (e) {
                    reject(e);
                } else {
                    resolve(0);
                }
            });
        });

        const raceTask = Promise.race([done, test]);

        try {
            await raceTask;
        } finally {
            close();
        }
    });
}
