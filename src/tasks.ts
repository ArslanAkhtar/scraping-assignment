import browserFactory from "./Browser/browserFactory";

(async () => {
	await Promise.all([(async () => await browserFactory("api"))()]);
})();
