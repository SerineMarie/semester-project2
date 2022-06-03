import menu from "./components/common/menu.js";
import footer from "./components/common/footer.js";
import { indexHtml, heroBanner } from "./components/home/indexHtml.js"
import { oneProduct } from "./components/products/oneProduct.js";
import { productsHtml } from "./components/products/productsHtml.js";
import { logOut} from "./utils/form/logOut.js";

menu();
footer();
heroBanner();
indexHtml();
productsHtml();
oneProduct();
logOut();
