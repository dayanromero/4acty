import { Controller, Get, Body, Post } from '@nestjs/common';
import { Auth, User } from 'src/common/decorators';
import { RatingsService } from 'src/ratings/ratings.service';
import { Raiting } from 'src/ratings/entity/raitings.entity';
import { CreateChallangeCognitiveDto, CreateDtoQualifyChallange,GetDtoQualifyChallange } from './dto';
import { User as UserEntity } from 'src/user/entity';
import { ChallengeQualifyService } from './challenge-qualify.service';
import { PointsUserService } from 'src/points-user/points-user.service';
import { CreatePoinstUserDto } from 'src/points-user/dto';
import { UserService } from 'src/user/user.service';
import { GroupQualify } from 'src/ratings/enum';
import { DifficultyService } from '../difficulty/difficulty.service';
import { TestService } from '../test/test.service';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/category/entity';
import { UserCategoryService } from 'src/user-category/user-category.service';


@Controller('challenge-qualify')
export class ChallengeQualifyController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly challengeQualifyService: ChallengeQualifyService,
    private readonly pointsUserService: PointsUserService,
    private readonly userService: UserService,
    private readonly difficultyService:DifficultyService,
    private readonly testService:TestService,
    private readonly categoryService:CategoryService,
    private readonly userCategoryService:UserCategoryService
  ) { }
  @Auth()
  @Post('/physical')
  async generateQualificationPhysical(
    @Body() dto: CreateDtoQualifyChallange,
    @Body() dto_points: CreatePoinstUserDto,
    @User() user: UserEntity
  ) {

    let raiting = null;
    let qualifyAptitudeFitness = null;
    let qualificationRecord;
    
    /**
     *   eliminamos el test
     */
    dto.user = user;
    await this.challengeQualifyService.deleteQualifyChallangeForUser(dto);

    /**
     * Calculamos el valor del puntaje obtenido por la prueba
     */
    const raitingsRecords = await this.ratingsService.getManyToGroup(dto.groupRaiting);

    raiting = this.ratingsService.getRatings(raitingsRecords, dto.value);






    /**
     * Registramos en la tabla challange qualify
     */
    dto.user = user;
    dto.qualification = raiting;
    const qualifyGlobal = await this.challengeQualifyService.createOne(dto);


       


    const idAptitudePhysical = GroupQualify.APTITUD_FISICA;
    /**
     * Calculamos el valor en el que queda la persona con la aptitud fisica según la tabla records
     */
    const physicalFitnessRatingRecords: Raiting[] = await this.ratingsService.getManyToGroup(idAptitudePhysical);
    qualifyAptitudeFitness = this.ratingsService.getRatings(physicalFitnessRatingRecords, parseInt(qualifyGlobal.sum_total))

    
    /**
     * Obtenemos los record de dificultades que tiene el test
     */
    const difficultyRecords = await this.difficultyService.getManyToTest(dto.test);
    
    /**
     * Calculamos en que dificultad queda la persona
     */
    const difficulty = this.difficultyService.getRatings(difficultyRecords, qualifyAptitudeFitness);

    
    /**
     * Guardamos los puntos calculados para saber la dificultad en la que va ingresar la persona
     */
    
    dto_points.user = user;
    dto_points.qualification = difficulty;
    
    
    
   
    if(qualifyGlobal.total_record==3){
    
    

        //verifica si existe ya una calificación 
     const getQualification = await this.pointsUserService.getOne(dto_points)
     
     if(getQualification){
       /**
        * Actualizamos los resultados
        */
       qualificationRecord = await this.pointsUserService.updateOne(dto_points);
     }else{
  
       /**
          * Guardamos los resultados
          */
         qualificationRecord = await this.pointsUserService.createOne(dto_points);
       
     }
     /**
     * Obtenemos el id del modulo relacionado con el test
     */
      const getTest =  await this.testService.getOneWhitModule(qualificationRecord.test);
    /**
     * Eliminar modulos ya registrados
     */
      this.userCategoryService.deleteUserWhitCategory(getTest[0].moduleId,user);

    for (let index = 1; index <= qualificationRecord.qualification; index++) {
      
      /**
       * Obtenemos el id de la categoria padre para luego buscar las subcategorias que tiene para luego asignarlas al user
       */    
  
        const categoryDifficylty =await  this.categoryService.getCategorysForUser(getTest[0].moduleId,index,0);
        /**
         * Este servicio nos retornara las subcategorias para relacionarlas con el usuario
         */
        const categorySubCategory:Category[] = await  this.categoryService.getSubCategorys(categoryDifficylty[0].id);
        
        /**
         * Recorremos cada una de las categorias para luego relacionarlas con el usuario, segun el puntaje que haya sacado la persona
         */
         let inicializaCategoria = 0;
        categorySubCategory.forEach(element => {
          inicializaCategoria++;
          let inicilizaCategoria=0;
          if(inicializaCategoria==1){
            inicilizaCategoria=1;
          }
            this.userCategoryService.addUserWhitCategory(element,dto.user,getTest[0].moduleId,inicilizaCategoria);
        });
      }
    }

    
    return { "imc": this.userService.getImc(user), "record": await dto_points.qualification,"completed_remains":qualifyGlobal.total_record };


  }
  @Auth()
  @Post('/psychology')
  async generateQualificationPsychology(
    @Body() dto: CreateChallangeCognitiveDto,
    @Body() dto_points: CreatePoinstUserDto,
    @User() user: UserEntity
  ) {

    let raiting = null;
    let qualificationRecord;
    /**
     * Obtenemos los raitings por el tipo de grupo(APTITUD_COGNITIVA)
     */
    const raitingsRecords = await this.ratingsService.getManyToGroup(dto.groupRaiting);
    let qualifyGlobal = null;
    const values = dto.questions.values;


    

    dto.user = user; 
    // Eliminamos los resultados por viewApp (vista de la app) y le usuario y el tipo de test
    await this.challengeQualifyService.deleteQualifyChallangeForUser(dto);


    for (let index = 0; index < values.length; index++) {

      const element = values[index];
      const totalItems = values.length - 1;
      /**
     * Calculamos en que dificultad queda la persona
     * @raitingsRecords "tipo de raitings"
     * @element.value "valor correspondiente de el valor de la respuesta"
     * 
     */
      raiting = this.ratingsService.getRatings(raitingsRecords, element.value);

      dto.qualification = raiting;
      /**
       * Guardamos el resultado del calculo con los raitings (tabla sql)
       */
       qualifyGlobal = await this.challengeQualifyService.createOne(dto);

    }
    /**
     * Promediamos la calificaciones
     */
    
    
    const qualifyAptitudeFitness = parseInt(qualifyGlobal.sum_total) / parseInt(qualifyGlobal.total_record);
    dto_points.user = user;
    dto_points.qualification = Math.round(qualifyAptitudeFitness);

    
    //verifica si existe ya una calificación 
    const getQualification = await this.pointsUserService.getOne(dto_points)
    
    if(getQualification){
      /**
       * Actualizamos los resultados
       */
      qualificationRecord = await this.pointsUserService.updateOne(dto_points);
    }else{

      /**
         * Guardamos los resultados
         */
        qualificationRecord = await this.pointsUserService.createOne(dto_points);
      
    }
    /**
     * Obtenemos el id del modulo relacionado con el test
     */
     const getTest =  await this.testService.getOneWhitModule(qualificationRecord.test);

     qualificationRecord.qualification = 3;
    if(dto.viewApp==2){
      this.userCategoryService.deleteUserWhitCategory(getTest[0].moduleId,user);
      
      for (let index = 1; index <= qualificationRecord.qualification; index++) {
       
        
        
        const categoryDifficylty =await  this.categoryService.getCategorysForUser(getTest[0].moduleId,index,0);
        /**
         * Este servicio nos retornara las subcategorias para relacionarlas con el usuario
         */
        const categorySubCategory:Category[] = await  this.categoryService.getSubCategorys(categoryDifficylty[0].id);
        
        /**
         * Recorremos cada una de las categorias para luego relacionarlas con el usuario, segun el puntaje que haya sacado la persona
         */
         let inicializaCategoria = 0;
        categorySubCategory.forEach(element => {
          inicializaCategoria++;
          let inicilizaCategoria=0;
          if(inicializaCategoria==1){
            inicilizaCategoria=1;
          }
            this.userCategoryService.addUserWhitCategory(element,dto.user,getTest[0].moduleId,inicilizaCategoria);
        });
      }
    }

    return {"record": await qualificationRecord}; 
  }

  @Auth()
  @Post('/physiotherapy')
  async generateQualificationPhysiotherapy(
    @Body() dto: CreateChallangeCognitiveDto,
    @Body() dto_points: CreatePoinstUserDto,
    @User() user: UserEntity
  ) {
    
    let raiting = null;
    let qualificationRecord;
    /**
     * Obtenemos los raitings por el tipo de grupo(APTITUD_COGNITIVA)
     */
    const raitingsRecords = await this.ratingsService.getManyToGroup(dto.groupRaiting);
    let totalSuma = null;
    const values = dto.questions.values;
    
    dto.user = user; 
    // Eliminamos los resultados por viewApp (vista de la app) y le usuario y el tipo de test
    await this.challengeQualifyService.deleteQualifyChallangeForUser(dto);
    
    for (let index = 0; index < values.length; index++) {

      const element = values[index];
      const totalItems = values.length - 1;
      /**
     * Calculamos en que dificultad queda la persona
     * @raitingsRecords "tipo de raitings"
     * @element.value "valor correspondiente de el valor de la respuesta"
     * 
     */
      raiting = this.ratingsService.getRatings(raitingsRecords, element.value);

      dto.qualification = raiting;
      /**
       * Guardamos el resultado del calculo con los raitings (tabla sql)
       */
      totalSuma = await this.challengeQualifyService.createOne(dto);

    }

    /**
     * Promediamos la calificaciones
     */
    
    
    const qualifyAptitudeFitness = parseInt(totalSuma.sum_total) / parseInt(totalSuma.total_record);
    dto_points.user = user;
    dto_points.qualification = Math.round(qualifyAptitudeFitness);

    
   //verifica si existe ya una calificación 
   const getQualification = await this.pointsUserService.getOne(dto_points)
   if(getQualification){
     /**
      * Actualizamos los resultados
      */
     qualificationRecord = await this.pointsUserService.updateOne(dto_points);
    }else{
      
      /**
       * Guardamos los resultados
       */
      qualificationRecord = await this.pointsUserService.createOne(dto_points);
      
    }
    /**
     * Obtenemos el id del modulo relacionado con el test
     */
    const getTest =  await this.testService.getOneWhitModule(qualificationRecord.test);
    qualificationRecord.qualification = 5;
    if(dto.viewApp==3){
      this.userCategoryService.deleteUserWhitCategory(getTest[0].moduleId,user);
      
      for (let index = 1; index <= qualificationRecord.qualification; index++) {
        
        
        
        const categoryDifficylty =await  this.categoryService.getCategorysForUser(getTest[0].moduleId,index,0);
        /**
         * Este servicio nos retornara las subcategorias para relacionarlas con el usuario
         */
        const categorySubCategory:Category[] = await  this.categoryService.getSubCategorys(categoryDifficylty[0].id);
        console.log(categorySubCategory);
        
        /**
         * Recorremos cada una de las categorias para luego relacionarlas con el usuario, segun el puntaje que haya sacado la persona
         */
         let inicializaCategoria = 0;
        categorySubCategory.forEach(element => {
          inicializaCategoria++;
          let inicilizaCategoria=0;
          if(inicializaCategoria==1){
            inicilizaCategoria=1;
          }
            this.userCategoryService.addUserWhitCategory(element,dto.user,getTest[0].moduleId,inicilizaCategoria);
        });
      }
    }

    return {"record": await qualificationRecord}; 


    // return { "record": await this.pointsUserService.createOne(dto_points) };


  }
  @Auth()
  @Post('/nutrition')
  async generateQualificationNutrition(
    @Body() dto: CreateChallangeCognitiveDto,
    @Body() dto_points: CreatePoinstUserDto,
    @User() user: UserEntity
  ) {
    
    let raiting = null;
    let qualificationRecord;
    /**
     * Obtenemos los raitings por el tipo de grupo(APTITUD_COGNITIVA)
     */
    const raitingsRecords = await this.ratingsService.getManyToGroup(dto.groupRaiting);
    let totalSuma = null;
    const values = dto.questions.values;
    
    dto.user = user; 
    // Eliminamos los resultados por viewApp (vista de la app) y le usuario y el tipo de test
    await this.challengeQualifyService.deleteQualifyChallangeForUser(dto);
    
    for (let index = 0; index < values.length; index++) {

      const element = values[index];
      const totalItems = values.length - 1;
      /**
     * Calculamos en que dificultad queda la persona
     * @raitingsRecords "tipo de raitings"
     * @element.value "valor correspondiente de el valor de la respuesta"
     * 
     */
      raiting = this.ratingsService.getRatings(raitingsRecords, element.value);

      dto.qualification = raiting;
      /**
       * Guardamos el resultado del calculo con los raitings (tabla sql)
       */
      totalSuma = await this.challengeQualifyService.createOne(dto);

    }

     /**
     * Promediamos la calificaciones
     */
    
    
    const qualifyAptitudeFitness = parseInt(totalSuma.sum_total) / parseInt(totalSuma.total_record);
    dto_points.user = user;
    dto_points.qualification = Math.round(qualifyAptitudeFitness);

    
    //verifica si existe ya una calificación 
    const getQualification = await this.pointsUserService.getOne(dto_points)
    
    if(getQualification){
      /**
       * Actualizamos los resultados
       */
      qualificationRecord = await this.pointsUserService.updateOne(dto_points);
    }else{
 
      /**
         * Guardamos los resultados
         */
        qualificationRecord = await this.pointsUserService.createOne(dto_points);
      
    }
    /**
     * Obtenemos el id del modulo relacionado con el test
     */
     const getTest =  await this.testService.getOneWhitModule(qualificationRecord.test);
     qualificationRecord.qualification = 3;
     if(dto.viewApp==1){
      this.userCategoryService.deleteUserWhitCategory(getTest[0].moduleId,user);
      
      for (let index = 1; index <= qualificationRecord.qualification; index++) {
       
        
        
        const categoryDifficylty =await  this.categoryService.getCategorysForUser(getTest[0].moduleId,index,0);
        /**
         * Este servicio nos retornara las subcategorias para relacionarlas con el usuario
         */
        const categorySubCategory:Category[] = await  this.categoryService.getSubCategorys(categoryDifficylty[0].id);
        
        /**
         * Recorremos cada una de las categorias para luego relacionarlas con el usuario, segun el puntaje que haya sacado la persona
         */
         let inicializaCategoria = 0;
        categorySubCategory.forEach(element => {
          inicializaCategoria++;
          let inicilizaCategoria=0;
          if(inicializaCategoria==1){
            inicilizaCategoria=1;
          }
            this.userCategoryService.addUserWhitCategory(element,dto.user,getTest[0].moduleId,inicilizaCategoria);
        });
      }
    }

    return {"record": await qualificationRecord};


  }


  /**
   * Obtener resultados de los test fisicos
   * @param user 
   */
  @Auth()
  @Get('/results/Physical')
  async getQualificationPhysical(
    @User() user: UserEntity
  ) {

    return await this.challengeQualifyService.getResults(user);
  }

    /**
   * Obtener resultados de los test fisicos
   * @param user 
   */
    @Auth()
    @Get('/results/psychology')
    async getQualificationpsychology(
      // @Body() dto: GetDtoQualifyChallange,
      @User() user: UserEntity
    ) {
      return {ok:true,message:'Principiante',data:{module:1}}
    }
    /**
   * Obtener resultados de los test fisicos
   * @param user 
   */
    @Auth()
    @Get('/results/nutrition')
    async getQualificationNutrition(
      // @Body() dto: GetDtoQualifyChallange,
      @User() user: UserEntity
    ) {
      return {ok:true,message:'Principiante',data:{module:2}}
    }
    /**
   * Obtener resultados de los test fisicos
   * @param user 
   */
     @Auth()
     @Get('/results/physiotherapy')
     async getQualificationPhysiotherapy(
      //  @Body() dto: GetDtoQualifyChallange,
       @User() user: UserEntity
     ) {
      //  dto.user = user;
       return {ok:true,message:'Principiante',data:{module:9}}
     }
  
  




}
