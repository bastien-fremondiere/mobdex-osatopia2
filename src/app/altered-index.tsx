import lunr from "lunr";
import ALTERED from "../altered";

const alteredIndex = lunr(function () {
    this.ref('entityId');
    this.field('name');
    this.field('order');
    ALTERED.forEach((altered) => {
        this.add(
            altered
        );
    }, this);
});
export default alteredIndex;