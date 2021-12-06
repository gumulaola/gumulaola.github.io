
registerPaint("rect", class {
    static get inputProperties() {
        return ["--size", "--color"];
    }
    paint(ctx, geom, properties) {
        const size = geom.width / properties.get('--size')[0];
        const color = properties.get('--color')[0];
        const colors = [color, '#fff'];
        for (let y = 0; y < geom.height / size; y++) {
            for (let x = 0; x < geom.width / size; x++) {
                ctx.textBaseline = "alphabetic";
                ctx.fillStyle = colors[(x + y) % colors.length];
                ctx.beginPath();
                ctx.rect(x * size, y * size, size, size);
                ctx.fill();
            }
        }
    }
});