package com.rtu.iNutrix.service;

import com.google.ortools.Loader;
import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;
import com.rtu.iNutrix.models.DTO.Meals.*;
import com.rtu.iNutrix.models.DTO.Products.ProductDTO;
import com.rtu.iNutrix.models.DTO.UserDataDTO;
import com.rtu.iNutrix.models.entities.Diet;
import com.rtu.iNutrix.models.entities.DietProduct;
import com.rtu.iNutrix.repositories.DietProductRepository;
import com.rtu.iNutrix.repositories.DietRepository;
import com.rtu.iNutrix.service.interfaces.MealsService;
import com.rtu.iNutrix.service.interfaces.ProductsService;
import com.rtu.iNutrix.service.interfaces.UserDataService;
import com.rtu.iNutrix.utilities.constants.LookUpConstants;
import com.rtu.iNutrix.utilities.errors.SolverErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class MealsServiceImpl implements MealsService {


    private final UserDataService _userDataService;


    private final ProductsService _productService;

    private final DietRepository _dietRepo;

    private  final DietProductRepository _dietProductRepo;

    @Autowired
    public MealsServiceImpl(UserDataService userDataService,ProductsService productsService, DietRepository dietRepo,DietProductRepository dietProductRepository){
        this._userDataService = userDataService;
        this._productService = productsService;
        this._dietRepo = dietRepo;
        this._dietProductRepo = dietProductRepository;
    }

    @Override
    public DietDayMetaData getDietDayMetadata(DietGoal goal) throws IllegalAccessException, SolverErrorCodes.SolutionNotFoundException {
        Loader.loadNativeLibraries();
        MPSolver solver = MPSolver.createSolver("GLOP");

        Nutrients nutrients  = _getNeededNutrients(goal);

        List<ProductDTO> products = _productService.getAllProducts();

        HashMap<ProductDTO, MPVariable> map = new HashMap<>();


        for(ProductDTO product : products){
           if (!product.isBanned()) map.put(product,solver.makeNumVar(0.0,4,product.getName()));
        }


        //Sugar Constrains
        _addCustomConstraintForProductGroup(solver,map,"Sugar",0,1,LookUpConstants.LookUp_ProductGroup_ConfectioneryProducts);
        //Fruit Constraints
        _addCustomConstraintForProductGroup(solver,map,"Fruits",0,2,LookUpConstants.LookUp_ProductGroup_FruitsAndBerries);
        //Meat Constraints
       // _addCustomConstraintForProductGroup(solver,map,"Meat",1,3,LookUpConstants.LookUp_ProductGroup_MeatProducts);
        //Cereal Constraints
      //  _addCustomConstraintForProductGroup(solver,map,"Cereal Products",1,4.5,LookUpConstants.LookUp_ProductGroup_CerealProducts);

        MPConstraint protein = solver.makeConstraint(nutrients.getProtein().getMinimumValue(),nutrients.getProtein().getMaximumValue(),"Protein");
        MPConstraint carbs = solver.makeConstraint(nutrients.getCarbohydrates().getMinimumValue(),nutrients.getCarbohydrates().getMaximumValue(),"Carbs");
        MPConstraint fat = solver.makeConstraint(nutrients.getFat().getMinimumValue(),nutrients.getFat().getMaximumValue(),"Fat");
        MPConstraint kcal = solver.makeConstraint(nutrients.getKcal().getMinimumValue(),nutrients.getKcal().getMaximumValue(),"Kcal");
        MPConstraint A = solver.makeConstraint(nutrients.getA().getMinimumValue(),nutrients.getA().getMaximumValue(),"A");
        MPConstraint B1 = solver.makeConstraint(nutrients.getB1().getMinimumValue(),nutrients.getB1().getMaximumValue(),"B1");
        MPConstraint B2 = solver.makeConstraint(nutrients.getB2().getMinimumValue(),nutrients.getB2().getMaximumValue(),"B2");
        MPConstraint PP = solver.makeConstraint(nutrients.getPP().getMinimumValue(),nutrients.getPP().getMaximumValue(),"PP");
        MPConstraint C = solver.makeConstraint(nutrients.getC().getMinimumValue(),nutrients.getC().getMaximumValue(),"C");
        MPConstraint Ca = solver.makeConstraint(nutrients.getCa().getMinimumValue(),nutrients.getCa().getMaximumValue(),"Ca");
        MPConstraint P = solver.makeConstraint(nutrients.getP().getMinimumValue(),nutrients.getP().getMaximumValue(),"P");
        MPConstraint Fe = solver.makeConstraint(nutrients.getFe().getMinimumValue(),nutrients.getFe().getMaximumValue(),"Fe");


        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            protein.setCoefficient(entry.getValue(),entry.getKey().getProtein());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            carbs.setCoefficient(entry.getValue(),entry.getKey().getCarbohydrates());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            fat.setCoefficient(entry.getValue(),entry.getKey().getFat());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            kcal.setCoefficient(entry.getValue(),entry.getKey().getKcal());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
           A.setCoefficient(entry.getValue(),entry.getKey().getA());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            B1.setCoefficient(entry.getValue(),entry.getKey().getB1());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            B2.setCoefficient(entry.getValue(),entry.getKey().getB2());
        }
        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            PP.setCoefficient(entry.getValue(),entry.getKey().getPP());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            C.setCoefficient(entry.getValue(),entry.getKey().getC());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            Ca.setCoefficient(entry.getValue(),entry.getKey().getCa());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            P.setCoefficient(entry.getValue(),entry.getKey().getP());
        }

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            Fe.setCoefficient(entry.getValue(),entry.getKey().getFe());
        }

        MPObjective objective = solver.objective();

        int min = 1;
        int max = 10;

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            objective.setCoefficient(entry.getValue(),(int)Math.floor(Math.random()*(max-min+1)+min));
        }



        objective.setMaximization();

        final MPSolver.ResultStatus resultStatus = solver.solve();
        if (resultStatus == MPSolver.ResultStatus.INFEASIBLE | resultStatus == MPSolver.ResultStatus.NOT_SOLVED) {
            throw new SolverErrorCodes.SolutionNotFoundException();
        }


        List<DailyProduct> mealProducts = new ArrayList<>();

        DietDayMetaData metadata = new DietDayMetaData(nutrients);

        metadata.setProducts(mealProducts);

        for (Map.Entry<ProductDTO, MPVariable> entry : map.entrySet()) {
            if(entry.getValue().solutionValue() > 0){
                ProductDTO product = entry.getKey();
                double value = entry.getValue().solutionValue();

                mealProducts.add(new DailyProduct(product,value));

                metadata.setNutrientAmount(product,value);

            }
        }

        return metadata;

    }

    @Override
    public DietDTO createDiet(int days,DietGoal goal) throws IllegalAccessException, SolverErrorCodes.SolutionNotFoundException {

        DietDTO dietDTO = new DietDTO();
        List<DietDayDTO> dietDayDTOS = new ArrayList<>();
        ZonedDateTime today = ZonedDateTime.now(ZoneOffset.UTC);

        DietDetails details = new DietDetails();

        details.setDietGoal(goal);


        for(int i = 0; i<days;i++){
            DietDayDTO dietDayDTO = new DietDayDTO();

            ZonedDateTime date =  today.plusDays(i);

            DietDayMetaData day = getDietDayMetadata(goal);
            day.setMeals(getMealsForDay(day.getProducts()));

            dietDayDTO.setDate(date);
            dietDayDTO.setDietDayMetadata(day);


            dietDayDTOS.add(dietDayDTO);

        }

        if(dietDayDTOS.size() >0){
            DietDayDTO dto = dietDayDTOS.get(0);

            details.setKcal(dto.getDietDayMetadata().getKcal().getActualValue());
        }

        dietDTO.setDietDetails(details);
        dietDTO.setDietDays(dietDayDTOS);

        return dietDTO;
    }

    @Override
    public List<MealDTO> getMealsForDay(List<DailyProduct> products) throws SolverErrorCodes.SolutionNotFoundException {
       Loader.loadNativeLibraries();
        class ProductHelper {
            DailyProduct dailyProduct;
            double productAmountUsed[] = new double[3]; // ProductAmountUsed[0] for product amount used in breakfast, 1 -
            MPVariable mpVariable;
            public double getCalorieCoefficient() {
                return dailyProduct.getProductDTO().getKcal();
            }
        }
        List<ProductHelper> productHelperList = new ArrayList<>();


        double totalCaloriesDuringDay = 0;
        for (DailyProduct dailyProduct : products) {
            totalCaloriesDuringDay+= dailyProduct.getProductDTO().getKcal()*dailyProduct.getAmount();

            ProductHelper productHelper = new ProductHelper();
            productHelper.dailyProduct = dailyProduct;
            productHelperList.add(productHelper);
        }

        final double caloriesBreakfast = totalCaloriesDuringDay * 0.35;
        final double caloriesLunch = totalCaloriesDuringDay * 0.45;
        final double caloriesLast = totalCaloriesDuringDay * 0.2;  // Dinner uses all remaining products
        // solver finds solution between (necessary cal) and (necessary cal+this value)
        final double calorieTolerance = totalCaloriesDuringDay * 0.08; // 8% tolerance
        final double maxProductAmountPerServingCoefficient = 0.75; // Breakfast and lunch won't use more than 75% of product to get good product distribution

        final String unsuitableProductGroupsForBreakfast = "LookUp_ProductGroup_MeatProducts|LookUp_ProductGroup_FishProducts";

        MPSolver solver = MPSolver.createSolver("GLOP");
        List <MealDTO> mealsForDay = new ArrayList<>();



        // breakfast
        for (ProductHelper productHelper : productHelperList) {
            productHelper.mpVariable = solver.makeNumVar(0, productHelper.dailyProduct.getAmount()*maxProductAmountPerServingCoefficient, productHelper.dailyProduct.getName());
        }
        MPConstraint calories = solver.makeConstraint(caloriesBreakfast, caloriesBreakfast+calorieTolerance, "calories");
        MPConstraint unsuitableForBreakfast = solver.makeConstraint(0,0,"suitableForBreakfast");
        for (ProductHelper productHelper : productHelperList) {
            calories.setCoefficient(productHelper.mpVariable, productHelper.getCalorieCoefficient());
            if (productHelper.dailyProduct.getProductGroup().getGroupName().matches(unsuitableProductGroupsForBreakfast)) {
                unsuitableForBreakfast.setCoefficient(productHelper.mpVariable, 1);    // Preventing unsuitable products from breakfast
            }
            else {
                unsuitableForBreakfast.setCoefficient(productHelper.mpVariable, 0);
            }
        }
        MPObjective objective = solver.objective();
        for (ProductHelper productHelper : productHelperList) objective.setCoefficient(productHelper.mpVariable, productHelper.dailyProduct.getAmount());
        objective.setMinimization();

        final MPSolver.ResultStatus resultStatusBreakfast = solver.solve();
        if (resultStatusBreakfast == MPSolver.ResultStatus.OPTIMAL || resultStatusBreakfast == MPSolver.ResultStatus.FEASIBLE){
            for (ProductHelper productHelper : productHelperList) productHelper.productAmountUsed[0] = productHelper.mpVariable.solutionValue();
        }
        else throw new SolverErrorCodes.SolutionNotFoundException();
        solver.clear();

        // lunch
        for (ProductHelper productHelper : productHelperList) {
            double minimumProductAmountForLunch;
            if (productHelper.dailyProduct.getAmount()-productHelper.productAmountUsed[0] >= 2.5) { // this reduces chances that dinner products will have more than 250 grams each
                minimumProductAmountForLunch = productHelper.dailyProduct.getAmount()*0.35;
            }
            else {
                minimumProductAmountForLunch = 0;
            }
            // Lunch is set to use up to 75% of remaining product amount
            final double maximumProductAmountForLunch = (productHelper.dailyProduct.getAmount()-productHelper.productAmountUsed[0])*maxProductAmountPerServingCoefficient;
            productHelper.mpVariable = solver.makeNumVar(minimumProductAmountForLunch,maximumProductAmountForLunch, productHelper.dailyProduct.getName());
        }
        calories = solver.makeConstraint(caloriesLunch, caloriesLunch+calorieTolerance, "calories");
        for (ProductHelper productHelper : productHelperList) calories.setCoefficient(productHelper.mpVariable, productHelper.getCalorieCoefficient());
        objective = solver.objective();
        for (ProductHelper productHelper : productHelperList) {
            objective.setCoefficient(productHelper.mpVariable, productHelper.dailyProduct.getAmount());
        }
        objective.setMinimization();

        final MPSolver.ResultStatus resultStatusLunch = solver.solve();
        if (resultStatusLunch == MPSolver.ResultStatus.OPTIMAL || resultStatusLunch == MPSolver.ResultStatus.FEASIBLE){
            for (ProductHelper productHelper: productHelperList) productHelper.productAmountUsed[1] = productHelper.mpVariable.solutionValue();
        }
        else throw new SolverErrorCodes.SolutionNotFoundException();

        // dinner
        // All remaining unused products are used for dinner
        for (ProductHelper productHelper : productHelperList) productHelper.productAmountUsed[2] = productHelper.dailyProduct.getAmount()-(productHelper.productAmountUsed[0]+productHelper.productAmountUsed[1]);

        // Creating and filling List<DailyProduct> for breakfast, lunch and dinner
        List<List<DailyProduct>> dailyProductLists = new ArrayList<List<DailyProduct>> (3);
        for (int i = 0; i < 3; i++) dailyProductLists.add(new ArrayList<DailyProduct>());
        for (int i = 0; i < dailyProductLists.size(); i++) {
            for (ProductHelper productHelper : productHelperList) {
                if (productHelper.productAmountUsed[i] == 0) {
                    continue;
                }
                DailyProduct product = new DailyProduct(productHelper.dailyProduct);
                product.setAmount(productHelper.productAmountUsed[i]);
                dailyProductLists.get(i).add(product);
            }
        }

        mealsForDay.add(new MealDTO(MealType.BREAKFAST, dailyProductLists.get(0)));
        mealsForDay.add(new MealDTO(MealType.LUNCH, dailyProductLists.get(1)));
        mealsForDay.add(new MealDTO(MealType.DINNER, dailyProductLists.get(2)));

        return mealsForDay;
    }

    @Override
    public UUID saveDiet(DietDTO diet) {

        Diet dietEntity = new Diet();

        List<DietProduct> products = new ArrayList<>();

        dietEntity.setDietGoal(diet.getDietDetails().getDietGoal());
        dietEntity.setUser(_userDataService.getUser());
        dietEntity.setKcal(diet.getDietDetails().getKcal());


        for(DietDayDTO dietDay :diet.getDietDays()){

            for(MealDTO meal : dietDay.getDietDayMetadata().getMeals()){

                for(DailyProduct dailyProduct : meal.getProducts()){
                    products.add(new DietProduct(dailyProduct,meal.getMealType(),dietEntity, dietDay.getDate()));
                }
            }
        }

        dietEntity.setDays(diet.getDietDays().size());
        dietEntity.setDietProducts(Set.copyOf(products));

        _dietRepo.save(dietEntity);
        _dietProductRepo.saveAll(dietEntity.getDietProducts());


        return dietEntity.getId();
    }

    @Override
    public DietDTO getCurrentDiet() {

        return null;
    }

    private void _addCustomConstraintForProductGroup(MPSolver solver ,HashMap<ProductDTO,MPVariable> variables, String name,double lowerValue,double upperValue,UUID productGroup){
        Map<ProductDTO, MPVariable> filtredVariables = variables.entrySet().stream().filter(x->x.getKey().getProductGroup().getId().equals(productGroup)).collect(Collectors.toMap(e->e.getKey(),e->e.getValue()));

        MPConstraint constraint = solver.makeConstraint(lowerValue,upperValue,name);

        for (Map.Entry<ProductDTO, MPVariable> entry :filtredVariables.entrySet()) {
            constraint.setCoefficient(entry.getValue(),1);
        }
    }



    private Nutrients _getNeededNutrients(DietGoal goal){
        double caloriesNeededPerDay = _getAMRrate() * _getMBR();

        if(goal == DietGoal.MUSCLEGROWTH){
            caloriesNeededPerDay+= 250;
        }else if(goal == DietGoal.WEIGHTLOSS){
            caloriesNeededPerDay-= 250;
        }

        //Carbs 4 calories per gram
        //Protein 4 calories per gram
        // Fat 9 calories per gram

        double carbsAmount = (caloriesNeededPerDay*0.60)/4;
        double proteinAmount = (caloriesNeededPerDay * 0.25)/4;
        double fatAmount = (caloriesNeededPerDay * 0.15)/9;



        Nutrient carbs = new Nutrient("Carbs",carbsAmount * 0.9,carbsAmount * 1.1);
        Nutrient protein = new Nutrient("Protein",proteinAmount * 0.9, proteinAmount * 1.1);
        Nutrient fat = new Nutrient("Fat",fatAmount * 0.9,fatAmount * 1.1);
        Nutrient kCal = new Nutrient("kCal",caloriesNeededPerDay * 0.9,caloriesNeededPerDay * 1.1);
        return Nutrients.requiredNutrients
                (_userDataService.getUserData().getGender(),
                        protein,
                        fat,
                        carbs,
                       kCal
                        );
    }




    private double _getAMRrate(){

        UUID userActivityLevel = _userDataService.getUserData().getActivityLevel();

        if(LookUpConstants.LookUp_ActivityLevel_Sedentary.equals(userActivityLevel)){
            return 1.2;
        }else if(LookUpConstants.LookUp_ActivityLevel_LightlyActive.equals(userActivityLevel)){
            return 1.375;
        }else if(LookUpConstants.LookUp_ActivityLevel_ModeratelyActive.equals(userActivityLevel)){
            return 1.55;
        }else if(LookUpConstants.LookUp_ActivityLevel_Active.equals(userActivityLevel)){
            return 1.725;
        }else{
            return 1.9;
        }
    }

    private double _getMBR(){
        UserDataDTO userData = _userDataService.getUserData();

        if(userData.getGender() == 'M'){
            return 66.47+ 13.75 * userData.getBodyWeight()+5.003 * userData.getHeight() - 6.755 * userData.getAge();
        }else{
            return 655.1+ 9.563 * userData.getBodyWeight()+1.85 * userData.getHeight() - 4.676 * userData.getAge();
        }
    }

}
