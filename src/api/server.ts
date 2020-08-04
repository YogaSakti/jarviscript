import appController from "./app";
const app = appController.app;

app.listen(3333, () => {
  console.log("App running on port 3333!");
});
