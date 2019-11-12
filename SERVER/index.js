import app from './routers/routerIndex';

const port = process.env.PORT || 7070;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

export { app as default };
