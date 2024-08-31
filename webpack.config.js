module.exports={
    entry:'C:\\Users\\A\\WebstormProjects\\Js13k\\src\\Main.ts',
    output: {
        filename: "bundle.js"
    },
    mode:"development",
    devServer: {
        static:'./src'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:'ts-loader'
            }
        ]
    }
}