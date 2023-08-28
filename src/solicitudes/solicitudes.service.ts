import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiHeader } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Create_Usuario_Dto } from 'src/shared/dto/create_usuario_dto';
import { Edit_Solicitud_Dto } from 'src/shared/dto/edit_solicitud_dto';
import { Equipos } from 'src/shared/entities/equipo.entity';
import { Solicitudes } from 'src/shared/entities/solicitud.entity';
import { Usuarios } from 'src/shared/entities/usuario.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'nodemailer';
import { Empleados } from 'src/shared/entities/empleado.entity';
import { Unidades } from '../shared/entities/unidad.entity';
import { Dominios } from 'src/shared/entities/dominio.entity';
import { Trs_Prg_Entity } from 'src/shared/entities/preguntas.entity';
import { Trs_Orc_Entity } from '../shared/entities/respuestas.entity';
import { Create_Encuesta_Dto } from '../shared/dto/create_encuesta_dto';
import { Trs_Ree_Entity } from 'src/shared/entities/encuestas.entity';
import axios from 'axios';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SolicitudesService {
 
    
    constructor(
        @InjectRepository(Solicitudes) private solicitudesRepository: Repository<Solicitudes>,
        @InjectRepository(Usuarios) private usuariosRepository: Repository<Usuarios>,
        @InjectRepository(Equipos) private equiposRepository: Repository<Equipos>,
        @InjectRepository(Empleados) private empleadosRepository: Repository<Empleados>,
        @InjectRepository(Unidades) private unidadesRepository: Repository<Unidades>,
        @InjectRepository(Dominios) private dominiosRepository: Repository<Dominios>,
        @InjectRepository(Trs_Prg_Entity) private preguntasRepository: Repository<Trs_Prg_Entity>,
        @InjectRepository(Trs_Orc_Entity) private respuestasRepository: Repository<Trs_Orc_Entity>,
        @InjectRepository(Trs_Ree_Entity) private encuestaRepository: Repository<Trs_Ree_Entity>,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,  
        private authService: AuthService 
        ) {}

      @ApiHeader({
          name: 'https://[::1]:3010/soltra/login',
          description: 'Valida ingreso del usuario por medio del DUI',
        })
        async token(v_dui: string) {
          const register = await this.usuariosRepository.find({
            where: { uvsDui: "'"+ v_dui+ "'"}});

          if(!register)
          throw new HttpException('Ha ocurrido un error al tratar recuperar un usuario con el DUI', HttpStatus.FORBIDDEN);
        else{
          const user = await this.login({v_dui});
          if (!user) {
            throw new UnauthorizedException();
          }  
          
          let datos: {
            uvsCodcia: string,
            uvsCodigo: number,
            uvsDui: string,
            uvsNombre: string,
            uvsPassword: string,
            uvsCodrol: number,
            token: string
          }[] = []

          register.forEach(register=> {
            datos.push({
              uvsCodcia: register.uvsCodcia,
              uvsCodigo: register.uvsCodigo,
              uvsDui: register.uvsDui,
              uvsNombre: register.uvsNombre,
              uvsPassword: register.uvsPassword,
              uvsCodrol: register.uvsCodrol,
              token: user
            });
          })
          //console.log(datos);  
          var p = JSON.stringify(datos);//Transformar a STRING
          var q = p.replace("[","");//Elimina el primer caracter. Es este caso es el "["
          var r = q.substring(0, q.length - 1);//Elimina el último caracter. Es este caso es el "]"
          var s = JSON.parse(r);//Genera el JSON   
          console.log(s);          
           return {datos:s};
        };
      }


        //Api para generar el token
        @ApiHeader({
          name: '/login',
          description: 'API que Genera el TOKEN si el usuario es válido',
        })
        async login(dui: any) :Promise<any> {
          const payload = { dui: dui };
          return this.jwtService.sign(payload)};        


  @ApiHeader({
    name: 'Servicio: ',
    description: 'Busca solicitudes por medio de la llave',
  })
  async buscaSolPorLlave(
    v_cia: string,
    v_ani: number, 
    v_mes: number,
    v_sol: number,
  ): Promise<Solicitudes> {
    const register = await this.solicitudesRepository.findOne({where:{
      solCodcia: v_cia,
      solAnio: v_ani,
      solMes: v_mes,
      solCodigo: v_sol}
    });
   return register;
  }  

  @ApiHeader({
    name: 'Servicio: ',
    description: 'Busca solicitudes por medio de la llave',
  })
  async solAnterior(
    v_equ: number
  ) {
  
    const emp = await this.empleadosRepository
    .createQueryBuilder('emp')
    .where("emp.EMP_ESTADO IN('A','V','O')")
    .getMany();

    const emp1 = await this.empleadosRepository
    .createQueryBuilder('emp')
    .where("emp.EMP_ESTADO IN('A','V','O')")
    .getMany();

    const uni = await this.unidadesRepository
    .createQueryBuilder('uni')
    .where("uni.UNI_ESTADO = 'A'")
    .getMany();  

    const ant =  await this.solicitudesRepository
    .createQueryBuilder('ant')
    .where("ant.SOL_ANIO >= 2022")
    .andWhere("ant.SOL_KILMTR_ENTRADA IS NOT NULL ")
    .andWhere("ant.SOL_FECHA_REGRESO IS NOT NULL ")
    .andWhere("ant.SOL_EQUIPO = :equ",  { equ:  v_equ })
      .orderBy("ant.SOL_FECHA_REGRESO DESC, ant.SOL_CODCIA ")
      .getMany();     

      let solant:
      {
        solCodcia: string,
        solAnio: number,
        solMes: number,
        solCodigo: number,
        solEstado: string,
        solTipo: string,
        solCodent: string,
        solUniNombre: string,
        solFecsol: Date,
        solFecser: Date,
        solFecreg: Date,
        solCanper: number,
        solHorsal: string,
        solHorestRetorno: string,
        solDesJus: string,
        solCodresp: string,
        solNomresp:string,//Nombre de responsable
        solCodveh: string,
        solNumlic: string,
        solTiplic: string,
        solTipveh: string,
        solTipm: string,
        solHoras: string,
        solEquipo: number,
        solPlaca: string,
        solCodmot: string,
        solLlarep: string,
        solMica: string,
        solExtmic: string,
        solDespla: string,
        solDesfil: string,
        solLlarue: string,
        solLlafij: string,
        solCubo: string,
        solBolher: string,
        solTenaza: string,
        solTriref: string,
        solExtint: string,
        solEnctra: string,
        solHorasalida: string,
        solHoraentrada: string,
        solKmsSalida: string,
        solKmsEntrada: string,
        solDlugsinruta: string,
        solJustificacion: string,
        solConductor: string,
        solNomCoductor:string,//Nombre de CONDUCTOR
        solCodrut: number,
        solCoddtn: number,
        solNumDest: number,
        solDestComp: number,
        solTitular: string,
        solComp: string,
        solComparteSn: string,
        solCombinaSn: string,
        solCorrelativo: number,
        solAcompaniantes: string,
        solReqCambioHor: string,
        solJusCambioHor: string,
        solVbCambioHor: string,
        solHorCambio: string,
        solAreaMetro: string,
        solKilmtrSalida: number,
        solKilmtrEntrada: number,
        solHorSalidaReal: number,
        solMinSalidaReal: number,
        solHorRegresoReal: number,
        solMinRegresoReal: number,
        solDestinos: string,
        solFechaRegreso: Date,
        solHerramientas: string,
        solQuimicos: string,
        solAccesorios: string,
        solVigilanteSal: string,
        solVigilanteEnt: string,
        solEncuestaSn: string,
        solJustiencSn: string         
      }[] = []  
      let valor = 0
      ant.forEach(async ant =>{
        valor++
        if (valor ==1){
        emp.forEach(emp => {if(emp.codcel === ant.solConductor){
           emp1.forEach(emp1=> {if(emp1.codcel === ant.solCodresp){
            uni.forEach(uni=>{if(uni.codenti === ant.solCodent){
             solant.push({
              solCodcia: ant.solCodcia,
              solAnio: ant.solAnio,
              solMes: ant.solMes,
              solCodigo: ant.solCodigo,
              solEstado: ant.solEstado,
              solTipo: ant.solTipo,
              solCodent: ant.solCodent,
              solUniNombre: uni.nombre,//Nombre de la dependencia
              solFecsol: ant.solFecsol,
              solFecser: ant.solFecser,
              solFecreg: ant.solFecreg,
              solCanper: ant.solCanper,
              solHorsal: ant.solHorsal,
              solHorestRetorno: ant.solHorestRetorno,
              solDesJus: ant.solDesJus,
              solCodresp: ant.solCodresp,
              solNomresp:emp1.nombre,//Nombre de responsable
              solCodveh: ant.solCodveh,
              solNumlic: ant.solNumlic,
              solTiplic: ant.solTiplic,
              solTipveh: ant.solTipveh,
              solTipm: ant.solTipm,
              solHoras: ant.solHoras,
              solEquipo: ant.solEquipo,
              solPlaca: ant.solPlaca,
              solCodmot: ant.solCodmot,
              solLlarep: ant.solLlarep,
              solMica: ant.solMica,
              solExtmic: ant.solExtmic,
              solDespla: ant.solDespla,
              solDesfil: ant.solDesfil,
              solLlarue: ant.solLlarue,
              solLlafij: ant.solLlafij,
              solCubo: ant.solCubo,
              solBolher: ant.solBolher,
              solTenaza: ant.solTenaza,
              solTriref: ant.solTriref,
              solExtint: ant.solExtint,
              solEnctra: ant.solEnctra,
              solHorasalida: ant.solHorasalida,
              solHoraentrada: ant.solHoraentrada,
              solKmsSalida: ant.solKmsSalida,
              solKmsEntrada: ant.solKmsEntrada,
              solDlugsinruta: ant.solDlugsinruta,
              solJustificacion: ant.solJustificacion,
              solConductor: ant.solConductor,
              solNomCoductor:emp.nombre,//Nombre de CONDUCTOR
              solCodrut: ant.solCodrut,
              solCoddtn: ant.solCoddtn,
              solNumDest: ant.solNumDest,
              solDestComp: ant.solDestComp,
              solTitular: ant.solTitular,
              solComp: ant.solComp,
              solComparteSn: ant.solComparteSn,
              solCombinaSn: ant.solCombinaSn,
              solCorrelativo: ant.solCorrelativo,
              solAcompaniantes: ant.solAcompaniantes,
              solReqCambioHor: ant.solReqCambioHor,
              solJusCambioHor: ant.solJusCambioHor,
              solVbCambioHor: ant.solVbCambioHor,
              solHorCambio: ant.solHorCambio,
              solAreaMetro: ant.solAreaMetro,
              solKilmtrSalida: ant.solKilmtrSalida,
              solKilmtrEntrada: ant.solKilmtrEntrada,
              solHorSalidaReal: ant.solHorSalidaReal,
              solMinSalidaReal: ant.solMinSalidaReal,
              solHorRegresoReal: ant.solHorRegresoReal,
              solMinRegresoReal: ant.solMinRegresoReal,
              solDestinos: ant.solDestinos,
              solFechaRegreso: ant.solFechaRegreso,
              solHerramientas: ant.solHerramientas,
              solQuimicos :ant.solQuimicos,
              solAccesorios : ant.solAccesorios,
              solVigilanteSal: ant.solVigilanteSal,
              solVigilanteEnt: ant.solVigilanteEnt,
              solEncuestaSn: ant.solEncuestaSn,
              solJustiencSn: ant.solJustiencSn 
             })
           }})          
      }})
    }})
  }
  })
    var p = JSON.stringify(solant);//Transformar a STRING
    var q = p.replace("[","");//Elimina el primer caracter. Es este caso es el "["
    var r = q.substring(0, q.length - 1);//Elimina el último caracter. Es este caso es el "]"
    var s = JSON.parse(r);//Genera el JSON          
    return s;      


  } 


  
  @ApiHeader({
    name: 'Servicio: Lista solicitudes Pendientes por número de equipo',
    description: 'Lista solicitudes Pendientes por número de equipo',
  })
  async  buscaSolPorEquipo(v_equ: string){

  const equ = await this.equiposRepository
  .createQueryBuilder('equ')
  .andWhere("(equ.EQU_NO_PLACA ||'-'|| equ.EQU_NO_MOTOR = '"+ v_equ +"') OR (equ.EQU_NO_PLACA ||'-'|| equ.EQU_NO_CHASIS = '"+ v_equ +"')")  
  /*
  .where("equ.EQU_NO_PLACA ||'-'|| equ.EQU_NO_MOTOR = :equ",  { equ:  v_equ })
  .orWhere("equ.EQU_NO_PLACA ||'-'|| equ.EQU_NO_CHASIS = :equ",  { equ:  v_equ })*/
  .getMany();
  
    const dom = await this.dominiosRepository
    .createQueryBuilder('dom')
    .where("dom.DOM_NOMBRE = 'MARCA VEHICULO'")
    .getMany();

    const dom1 = await this.dominiosRepository
    .createQueryBuilder('dom1')
    .where("dom1.DOM_NOMBRE = 'CLASE VEHICULO'")
    .getMany();    

    const emp = await this.empleadosRepository
    .createQueryBuilder('emp')
    .where("emp.EMP_ESTADO IN('A','V','O')")
    .getMany();

    const emp1 = await this.empleadosRepository
    .createQueryBuilder('emp')
    .where("emp.EMP_ESTADO IN('A','V','O')")
    .getMany();

    const uni = await this.unidadesRepository
    .createQueryBuilder('uni')
    .where("uni.UNI_ESTADO = 'A'")
    .distinct(true)
    .getMany();

    const sol =  await this.solicitudesRepository
    .createQueryBuilder('sol')
    .where("((sol.SOL_ESTADO IN('A') AND sol.SOL_TIPO IN('M')) OR (sol.SOL_ESTADO IN('U') AND sol.SOL_TIPO IN('P') AND sol.SOL_CORRELATIVO IS NOT NULL))")
    .andWhere("(sol.SOL_ANIO > 2022 OR(sol.SOL_ANIO = 2022 AND sol.SOL_MES = 12))"+
      " AND (sol.SOL_HOR_SALIDA_REAL IS NULL"+
      " OR sol.SOL_HOR_SALIDA_REAL IS NULL "+
      " OR sol.SOL_HOR_REGRESO_REAL IS NULL "+
      " OR sol.SOL_MIN_REGRESO_REAL IS NULL)")
    .andWhere(qb => {
      const subQuery = qb.subQuery()
          .select(" DISTINCT equ.EQU_NO_EQUIPO")
          .from(Equipos, "equ")
          .where("equ.EQU_CODCIA = sol.SOL_CODCIA")
          .andWhere("equ.EQU_NO_EQUIPO = sol.SOL_EQUIPO")
          .andWhere("((equ.EQU_NO_PLACA ||'-'|| equ.EQU_NO_MOTOR = '"+ v_equ +"') OR (equ.EQU_NO_PLACA ||'-'|| equ.EQU_NO_CHASIS = '"+ v_equ +"'))")
          .getQuery();
      return "sol.SOL_EQUIPO = " + subQuery;
      })
      .orderBy("sol.SOL_FECSER ASC, (SUBSTR(sol.SOL_HORSAL,1,2)) ASC, sol.SOL_CODCIA" )
      .getMany();   
  

        let equipos:{
          equCodcia: string,
          equNoEquipo: number,
          equEstado: string,
          equAnioCodenti: number,
          equCodenti: string,
          equCodDisp: string,
          equCodUbi: string,
          equKilmtrActual: number,
          equKilmtrBase: number,
          equKilmtrEspec: number,
          equClaseMantto: string,
          equNoPlaca: string,
          equAnioFab: string,
          equCodMarca: string,
          equNomMarca: string,
          equCodClase: string,
          equiNomClase: string,
          equModelo: string,
          equNoChasis: string,
          equNoMotor: string,
          equCodColindro: string,
          equCodTransmision: string,
          equColor: string,
          equCodCabina: string,
          equCapcidadCarga: string,
          equPaisOrigen: string,
          equCodCombustible: string,
          equValorAdquisicion: number,
          equValorSeguro: number,
          equNoLicitacion: string,
          equCodprv: number,
          equFecRecibido: Date,
          equCodResponsable: string,
          equCodUso: string,
          equNoSesionJd: string,
          equProcedenciaFondo: string,
          equFecUltReparacion: Date,
          equFecUltMatto: Date,
          equRendimiento: number,
          equPrecioSubasta: number,
          equFecDescarga: Date,
          equCodRespDesc: string,
          equObservaciones: string,
          equCodActfijo: string,
          equCr: string,
          equProy: string,
          equBateriaAmp: number,
          equLlantasMed: string,
          equCodempMot: string,
          equCategoria: string,
          equFlota: string,
          equKilProm: number,
          equPrestamo: string,
          equCodtae:string
        }[] = []

       

        equ.forEach(equ => {
          dom.forEach(dom => {if(dom.domValor === equ.equCodMarca){
            dom1.forEach(dom1 => {if(dom1.domValor === equ.equCodClase){
                equipos.push({
                  equCodcia: equ.equCodcia,
                  equNoEquipo: equ.equNoEquipo,
                  equEstado: equ.equEstado,
                  equAnioCodenti: equ.equAnioCodenti,
                  equCodenti: equ.equCodenti,
                  equCodDisp: equ.equCodDisp,
                  equCodUbi: equ.equCodUbi,
                  equKilmtrActual: equ.equKilmtrActual,
                  equKilmtrBase: equ.equKilmtrBase,
                  equKilmtrEspec: equ.equKilmtrEspec,
                  equClaseMantto: equ.equClaseMantto,
                  equNoPlaca: equ.equNoPlaca,
                  equAnioFab: equ.equAnioFab,
                  equCodMarca: equ.equCodMarca,
                  equNomMarca: dom.domDescripcion,
                  equCodClase: equ.equCodClase,
                  equiNomClase: dom1.domDescripcion,
                  equModelo: equ.equModelo,
                  equNoChasis: equ.equNoChasis,
                  equNoMotor: equ.equNoMotor,
                  equCodColindro: equ.equCodColindro,
                  equCodTransmision: equ.equCodTransmision,
                  equColor: equ.equColor,
                  equCodCabina: equ.equCodCabina,
                  equCapcidadCarga: equ.equCapcidadCarga,
                  equPaisOrigen: equ.equPaisOrigen,
                  equCodCombustible: equ.equCodCombustible,
                  equValorAdquisicion: equ.equValorAdquisicion,
                  equValorSeguro: equ.equValorSeguro,
                  equNoLicitacion: equ.equNoLicitacion,
                  equCodprv: equ.equCodprv,
                  equFecRecibido: equ.equFecRecibido,
                  equCodResponsable: equ.equCodResponsable,
                  equCodUso: equ.equCodUso,
                  equNoSesionJd: equ.equNoSesionJd,
                  equProcedenciaFondo: equ.equProcedenciaFondo,
                  equFecUltReparacion: equ.equFecUltReparacion,
                  equFecUltMatto: equ.equFecUltMatto,
                  equRendimiento: equ.equRendimiento,
                  equPrecioSubasta: equ.equPrecioSubasta,
                  equFecDescarga: equ.equFecDescarga,
                  equCodRespDesc: equ.equCodRespDesc,
                  equObservaciones: equ.equObservaciones,
                  equCodActfijo: equ.equCodActfijo,
                  equCr: equ.equCr,
                  equProy: equ.equProy,
                  equBateriaAmp: equ.equBateriaAmp,
                  equLlantasMed: equ.equLlantasMed,
                  equCodempMot: equ.equCodempMot,
                  equCategoria: equ.equCategoria,
                  equFlota: equ.equFlota,
                  equKilProm: equ.equKilProm,
                  equPrestamo: equ.equPrestamo,
                  equCodtae: equ.equCodtae 
                })
            }})
          }})
        })


        var p = JSON.stringify(equipos);//Transformar a STRING
        var q = p.replace("[","");//Elimina el primer caracter. Es este caso es el "["
        var r = q.substring(0, q.length - 1);//Elimina el último caracter. Es este caso es el "]"
        var s = JSON.parse(r);//Genera el JSON        

        let un=0
        let solicitudes:
        {
          solCodcia: string,
          solAnio: number,
          solMes: number,
          solCodigo: number,
          solEstado: string,
          solTipo: string,
          solCodent: string,
          solUniNombre: string,
          solFecsol: Date,
          solFecser: Date,
          solFecreg: Date,
          solCanper: number,
          solHorsal: string,
          solHorestRetorno: string,
          solDesJus: string,
          solCodresp: string,
          solNomresp:string,//Nombre de responsable
          solCodveh: string,
          solNumlic: string,
          solTiplic: string,
          solTipveh: string,
          solTipm: string,
          solHoras: string,
          solEquipo: number,
          solPlaca: string,
          solCodmot: string,
          solLlarep: string,
          solMica: string,
          solExtmic: string,
          solDespla: string,
          solDesfil: string,
          solLlarue: string,
          solLlafij: string,
          solCubo: string,
          solBolher: string,
          solTenaza: string,
          solTriref: string,
          solExtint: string,
          solEnctra: string,
          solHorasalida: string,
          solHoraentrada: string,
          solKmsSalida: string,
          solKmsEntrada: string,
          solDlugsinruta: string,
          solJustificacion: string,
          solConductor: string,
          solNomCoductor:string,//Nombre de CONDUCTOR
          solCodrut: number,
          solCoddtn: number,
          solNumDest: number,
          solDestComp: number,
          solTitular: string,
          solComp: string,
          solComparteSn: string,
          solCombinaSn: string,
          solCorrelativo: number,
          solAcompaniantes: string,
          solReqCambioHor: string,
          solJusCambioHor: string,
          solVbCambioHor: string,
          solHorCambio: string,
          solAreaMetro: string,
          solKilmtrSalida: number,
          solKilmtrEntrada: number,
          solHorSalidaReal: number,
          solMinSalidaReal: number,
          solHorRegresoReal: number,
          solMinRegresoReal: number,
          solDestinos: string,
          solFechaRegreso: Date,
          solHerramientas: string,
          solQuimicos: string,
          solAccesorios: string,
          solVigilanteSal: string,
          solVigilanteEnt: string,
          solEncuestaSn: string,
          solJustiencSn: string             
        }[] = []  
        let unidad

        sol.forEach(async sol => {
          emp.forEach(emp => {if(emp.codcel === sol.solConductor || emp.codcel === sol.solCodveh){
             emp1.forEach(emp1=> {if(emp1.codcel === sol.solCodresp){
              uni.forEach(uni=>{if(uni.codenti === sol.solCodent){
                un++
                if (un == 1) {
               solicitudes.push({
                solCodcia: sol.solCodcia,
                solAnio: sol.solAnio,
                solMes: sol.solMes,
                solCodigo: sol.solCodigo,
                solEstado: sol.solEstado,
                solTipo: sol.solTipo,
                solCodent: sol.solCodent,
                solUniNombre: uni.nombre,//Nombre de la dependencia
                solFecsol: sol.solFecsol,
                solFecser: sol.solFecser,
                solFecreg: sol.solFecreg,
                solCanper: sol.solCanper,
                solHorsal: sol.solHorsal,
                solHorestRetorno: sol.solHorestRetorno,
                solDesJus: sol.solDesJus,
                solCodresp: sol.solCodresp,
                solNomresp:emp1.nombre,//Nombre de responsable
                solCodveh: sol.solCodveh,
                solNumlic: sol.solNumlic,
                solTiplic: sol.solTiplic,
                solTipveh: sol.solTipveh,
                solTipm: sol.solTipm,
                solHoras: sol.solHoras,
                solEquipo: sol.solEquipo,
                solPlaca: sol.solPlaca,
                solCodmot: sol.solCodmot,
                solLlarep: sol.solLlarep,
                solMica: sol.solMica,
                solExtmic: sol.solExtmic,
                solDespla: sol.solDespla,
                solDesfil: sol.solDesfil,
                solLlarue: sol.solLlarue,
                solLlafij: sol.solLlafij,
                solCubo: sol.solCubo,
                solBolher: sol.solBolher,
                solTenaza: sol.solTenaza,
                solTriref: sol.solTriref,
                solExtint: sol.solExtint,
                solEnctra: sol.solEnctra,
                solHorasalida: sol.solHorasalida,
                solHoraentrada: sol.solHoraentrada,
                solKmsSalida: sol.solKmsSalida,
                solKmsEntrada: sol.solKmsEntrada,
                solDlugsinruta: sol.solDlugsinruta,
                solJustificacion: sol.solJustificacion,
                solConductor: sol.solConductor,
                solNomCoductor: emp.nombre,//Nombre de CONDUCTOR
                solCodrut: sol.solCodrut,
                solCoddtn: sol.solCoddtn,
                solNumDest: sol.solNumDest,
                solDestComp: sol.solDestComp,
                solTitular: sol.solTitular,
                solComp: sol.solComp,
                solComparteSn: sol.solComparteSn,
                solCombinaSn: sol.solCombinaSn,
                solCorrelativo: sol.solCorrelativo,
                solAcompaniantes: sol.solAcompaniantes,
                solReqCambioHor: sol.solReqCambioHor,
                solJusCambioHor: sol.solJusCambioHor,
                solVbCambioHor: sol.solVbCambioHor,
                solHorCambio: sol.solHorCambio,
                solAreaMetro: sol.solAreaMetro,
                solKilmtrSalida: sol.solKilmtrSalida,
                solKilmtrEntrada: sol.solKilmtrEntrada,
                solHorSalidaReal: sol.solHorSalidaReal,
                solMinSalidaReal: sol.solMinSalidaReal,
                solHorRegresoReal: sol.solHorRegresoReal,
                solMinRegresoReal: sol.solMinRegresoReal,
                solDestinos: sol.solDestinos,
                solFechaRegreso: sol.solFechaRegreso,
                solHerramientas: sol.solHerramientas,
                solQuimicos :sol.solQuimicos,
                solAccesorios : sol.solAccesorios,
                solVigilanteSal: sol.solVigilanteSal,
                solVigilanteEnt: sol.solVigilanteEnt,
                solEncuestaSn: sol.solEncuestaSn,
                solJustiencSn: sol.solJustiencSn              
               })
              }
             }})          
             un = 0            
        }})
       
      }})
    })
        
  return {equipo: s ,solicitudes: solicitudes};
    
  }  

    @ApiHeader({
      name: 'Servicio: ModificaSolicitud',
      description: 'ACTUALIZA UN REGISTRO en maestro de Solicitudes de transporte',
    })
    async actualizaSolicitud(v_cia: string, v_ani:number, v_mes:number, v_sol :number, dto: Edit_Solicitud_Dto): Promise<Solicitudes> {
      const toUpdate = await this.buscaSolPorLlave(v_cia, v_ani, v_mes, v_sol);
      if (!toUpdate)
          throw new HttpException('NO SE PUEDE ACTUALIZAR - No existe el registro - (modificaSolicitud)', HttpStatus.FORBIDDEN);
      const modelToEdit = Object.assign(toUpdate, dto);
      const datosEmp = await this.findOneEmp('7105011');//El correo debe enviarse a Personal de Transporte. 06/05/2022.
       if (!datosEmp) {return;}
       else {
        if (toUpdate.solEstado == 'F') {
          const enviaCorreo = await this.sendMail(datosEmp.correo, datosEmp.nombre, v_ani, v_mes, v_sol);
          }
        }
       return await this.solicitudesRepository.save(modelToEdit);
    }

    async findOneEmp(codcel:string) {
      try {
          const register = await this.empleadosRepository.findOne({where: {codcia:"001", codcel: codcel }}).then();
          if (register !== null && register !== undefined) {
              return register;
          }           
      } catch (error) {
          console.log(error);  
      }
}



  @ApiHeader({
    name: 'Servicio: buscaTodos_Usu(): Promise<Pri_Usu_Usuarios_Entity[]>',
    description: 'BUSCA TODOS LOS REGISTROS DEL MAESTRO DE USUARIOS',
  })
  async buscaTodosEquipos(): Promise<Equipos[]> {
    const register = await this.equiposRepository.find({
      order: {
        equNoEquipo: 'ASC',
      },
    });
    return register;
  }

  @ApiHeader({
    name: 'Servicio: busca_usuarios_por_llave(v_codcia: string, v_usuario: string): Promise<Pri_Usu_Usuarios_Entity>',
    description: 'Busca registro a partir de parametros enviados en el URL',
  })
  async EquipoByKey(
    v_cia: string,
    v_equ: number
  ): Promise<Equipos> {
    const register = await this.equiposRepository.findOne({where:
      {equCodcia: v_cia,
      equNoEquipo: v_equ}
    });
   return register;
  }  

  @ApiHeader({
    name: 'Servicio: buscaTodos los usuarios',
    description: 'BUSCA TODOS LOS REGISTROS DEL MAESTRO DE USUARIOS',
  })
  async buscaTodosUsuarios(): Promise<Usuarios[]> {
    const register = await this.usuariosRepository.find({
      order: {
        uvsCodigo: 'ASC',
      },
    });
    return register;
  }

  @ApiHeader({
    name: 'Servicio: busca_usuarios_por_llave(v_codcia: string, v_usuario: string): Promise<Pri_Usu_Usuarios_Entity>',
    description: 'Busca registro a partir de parametros enviados en el URL',
  })
  async buscaUsuarioDui(
    v_dui: string
  ): Promise<Usuarios> {
    const register = await this.usuariosRepository.findOne({where:
      {uvsDui: v_dui}
    });
   return register;
  } 

  @ApiHeader({
    name: 'Servicio: GsiUclService,  dto: Create_Gsi_Tin_Dto, Entidy<Gsi_Tin_Entity>',
    description: 'CREA UN REGISTRO DEL CATALOGO A PARTIR DE CAMPOS DE LA LLAVE PRIMARIA',
  })
  async creaUsuario(dto: Create_Usuario_Dto)//: Promise<Gsi_Ucl_Entity> 
  {
    const register = await this.usuariosRepository.findOne({where:
        {uvsCodcia: dto.uvsCodcia,
        uvsDui: dto.uvsDui}
   });
    if (register)
        throw new HttpException('NO SE PUEDE CREAR - El registro ya existe en la entity de Usuarios[]', HttpStatus.FORBIDDEN);
    else {
      dto.uvsCodigo=0;
      if (dto.uvsCodigo==0) {        
          const register = await this.usuariosRepository
          .createQueryBuilder()
          .select('MAX(Usuarios.uvsCodigo)', 'uvsCodigo')
          .getRawOne();        
          dto.uvsCodigo = register.uvsCodigo + 1;
          const model = this.usuariosRepository.create(dto);
          const newRegister = await this.usuariosRepository.save(model);
          return { message: 'Registro creado', newRegister };
        } 
    }
  }     
  
  @ApiHeader({
    name: 'Servicio: Proceso para generar correo al usuario responsable de transporte luego de finalizar solicitud',
    description: 'Proceso para generar correo al usuario responsable de transporte luego de finalizar solicitud',
  })  
  async sendMail(email:string, nombreEmpleado:string, v_ani:number, v_mes:number, v_sol:number) {
    try {
        const asuntoCorreo = 'Se ha FINALIZADO la solicitud descrita en el asunto';
        const despedida = '¡Feliz día!';
        await this.mailerService
            .sendMail({
            to: email ? email + '@cel.gob.sv'+', fredy.genovez.cel@gmail.com' : process.env.correoApoyo ,
            cc: 'fredy.genovez.cel@gmail.com',
            from: 'SisTRS@cel.gob.sv',
            subject: 'Notificación sobre FINALIZACIÓN de solicitud de transporte ' + v_ani + '-' + v_mes + '-' + v_sol + ' ✔',
            text: 'Bienvenido',
            template: 'encuesta',
            context: {
                nombreEmpleado: nombreEmpleado,
                asunto: asuntoCorreo,
                nombreEmpleadoSaludo: nombreEmpleado.toUpperCase(),
                despedida: despedida
            },
        })
            .then(() => { console.log('Correo Enviado a: ',email, nombreEmpleado); })
            .catch((error) => { console.log(error); });        
    } catch (error) {
        console.log(error);
    }
    
} 
  //////////////////////////////////////////////
  /////////////////Encuestas////////////////////
  /////////////////////////////////////////////
  @ApiHeader({
    name: 'Servicio: Busca todas las preguntas de la encuesta',
    description: 'Servicio: Busca todas las preguntas de la encuesta',
  })
  async buscaPreguntas() {
    const prg =  await this.preguntasRepository
    .createQueryBuilder('prg')
    .getMany();

    const orc =  await this.respuestasRepository
    .createQueryBuilder('orc')
    .andWhere(qb => {
      const subQuery = qb.subQuery()
      .select ("DISTINCT orc.ORC_CODPRG")
      .from(Trs_Prg_Entity,'prg')
      .where("prg.PRG_CODIGO = orc.ORC_CODPRG")
      .getQuery();
      return "(orc.ORC_CODPRG) IN "+ subQuery;
    })
    .getMany();

    let preguntas: {
      prgCodigo: number,
      prgEnunciado: string,
      prgTipo:string,
      prgEstado:string,
      respuestas 
    }[]= []

    let respuestas: {
      orcCodprg: number,
      orcCodigo: number,
      orcDescripcion: string
    }[]= []

    preguntas = []
    prg.forEach(prg=>{

      respuestas = []
      preguntas.push({
        prgCodigo: prg.prgCodigo,
        prgEnunciado: prg.prgEnunciado,
        prgTipo:prg.prgTipo,
        prgEstado: prg.prgEstado,
        respuestas}); 

      orc.forEach(orc=>{if(prg.prgCodigo == orc.orcCodprg){
        respuestas.push({
          orcCodprg: orc.orcCodprg,
          orcCodigo: orc.orcCodigo,
          orcDescripcion: orc.orcDescripcion
        });

      }})
     
    })
    return preguntas;
  }  

  @ApiHeader({
    name: 'Servicio: Busca las RESPUESTAS por PREGUNTA',
    description: 'Servicio: Busca las RESPUESTAS por PREGUNTA',
  })
  async buscaRespuestas(
    v_prg: number
  ): Promise<Trs_Orc_Entity[]> {
    const register = await this.respuestasRepository.find({where:
      {orcCodprg: v_prg}
    });
   return register;
  }   

  @ApiHeader({
    name: 'Servicio: Trs_Ree_Entity',
    description: '',
  })
  async creaEncuesta(dto: Create_Encuesta_Dto)//: Promise<Gsi_Ucl_Entity> 
  {
    const register = await this.encuestaRepository.findOne({where:
        {reeCodcia: dto.reeCodcia,
        reeAnisol: dto.reeAnisol,
        reeMessol: dto.reeMessol,
        reeCodsol: dto.reeCodsol,
        reeCodprg: dto.reeCodprg}
   });
    if (register)
        throw new HttpException('NO SE PUEDE CREAR - El registro ya existe en la entity de Encuestas', HttpStatus.FORBIDDEN);
    else {
          if(dto.rreCodorc==0 && dto.rreRespuesta.length ==0 ){
            throw new HttpException('NO SE PUEDE CREAR - El registro debe tener una respuesta cerrada o Abierta', HttpStatus.FORBIDDEN);
          }
          else {
    console.log(dto);
      dto.reeCodigo=0;
      if (dto.reeCodigo==0 ) {        
          const register = await this.encuestaRepository
          .createQueryBuilder()
          .select('MAX(Trs_Ree_Entity.reeCodigo)', 'reeCodigo')
          .where('REE_CODCIA = :cia',  { cia:  dto.reeCodcia })
          .andWhere('REE_ANISOL = :ani',  { ani:  dto.reeAnisol })
          .andWhere('REE_MESSOL = :mes',  { mes:  dto.reeMessol })
          .andWhere('REE_CODSOL = :cod',  { cod:  dto.reeCodsol })
          .getRawOne();        
          dto.reeCodigo = register.reeCodigo + 1;
          const model = this.encuestaRepository.create(dto);
          const newRegister = await this.encuestaRepository.save(model);
          return { message: 'Registro creado', newRegister };
        } 
    }
  }
  }

   ///////////////////////////////////// 
   @ApiHeader({
    name: '@Get(/sp/:v_cia/:v_ani/:v_mes/:v_cod)',
    description: 'Permite invocar un Procedimiento almacenado enviándole parámetros',
    })   
    async callSPCarga(
      v_cia: string,
      v_ani: number,
      v_mes: number,
      v_cod: number, 
      ): Promise<void> {
    const oracledb = require('oracledb')
    const config = {
      user: process.env.ORA_USERNAME,
      password: process.env.ORA_PASSWORD,
      connectString: process.env.ORA_CONECTION
    }
    try {      
        
        const conn = await oracledb.getConnection(config)
        const result =  await conn.execute (
          ` BEGIN
            sistrs.Trs_Nec_Notencuesta_Pr(:cia, :ani, :mes,:cod);
          END;`,
          {  
            cia: v_cia,
            ani: v_ani,
            mes: v_mes,
            cod: v_cod
          }
        );
        console.log(result);
        await conn.close()
        
    
          } catch (err) {
            console.log('Ouch!', err)
          }
          console.log('Procedimiento realizado con Éxito')
          
    }

    @ApiHeader({
      name: 'Servicio: buscaTodos_Usu(): Promise<Pri_Usu_Usuarios_Entity[]>',
      description: 'BUSCA TODOS LOS REGISTROS DEL MAESTRO DE USUARIOS',
    })
    async buscaJustificaciones(): Promise<Dominios[]> {
      const register = await this.dominiosRepository.find({
        where : {
          domCodcia: '001',
          domNombre: 'JUSTIENC_SN'
        },
        order: {
          domValor: 'ASC',
        },
      });
      return register;
    }



}
