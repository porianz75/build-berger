import classes from './burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const Burger = (props) => {
    //ravesh 1
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

 // ravesh 2  //khodam
    // let transformedIngredients=[]
    // for (let type in props.ingredients){
    //     for(let i= 1; i <= props.ingredients[type];i++){
    //         transformedIngredients.push(<BurgerIngredient key={type + i} type={type} />)
    //     }
    // }

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;