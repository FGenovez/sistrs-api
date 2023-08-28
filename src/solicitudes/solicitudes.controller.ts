import { Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Solicitudes } from 'src/shared/entities/solicitud.entity';
import { Usuarios } from 'src/shared/entities/usuario.entity';
import { SolicitudesService } from './solicitudes.service';
import { Equipos } from '../shared/entities/equipo.entity';
import { Create_Usuario_Dto } from 'src/shared/dto/create_usuario_dto';
import { Edit_Solicitud_Dto } from 'src/shared/dto/edit_solicitud_dto';
import { Trs_Prg_Entity } from '../shared/entities/preguntas.entity';
import { Trs_Orc_Entity } from '../shared/entities/respuestas.entity';
import { Trs_Ree_Entity } from '../shared/entities/encuestas.entity';
import { Create_Encuesta_Dto } from '../shared/dto/create_encuesta_dto';

@ApiTags('APIs para la Administración de Solicitudes de Transporte')
@Controller('soltra')
export class SolicitudesController {
      constructor(private solicitudesService: SolicitudesService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Valida ingreso del usuario por medio del DUI'})
  @ApiResponse({
      status: HttpStatus.OK,
      description: 'Valida ingreso del usuario por medio del DUI',
      type: [Usuarios],
    })     
    async login(
        @Body('uvsDui') v_dui: string,
    ): Promise<any>
     {
    const data = await this.solicitudesService.token(v_dui);
    if (!data) {return []}
    else {
      return data;
      
    }
  }        

  @UseGuards(JwtAuthGuard)
  @Get('/solicitudByKey/:cia/:ani/:mes/:cod')
  @ApiOperation({ summary: 'Lista solicitud por medio de la llave de la tabla'})
  @ApiResponse({
      status: HttpStatus.OK,
      description: 'Lista solicitud por medio de la llave de la tabla',
      type: [Solicitudes],
    })   
  async buscaSolPorLlave(
      @Param('cia') v_cia: string,
      @Param('ani') v_ani: number,
      @Param('mes') v_mes: number,
      @Param('cod') v_cod: number,) {
      const data = await this.solicitudesService.buscaSolPorLlave(v_cia, v_ani, v_mes, v_cod);
      if (!data) {return { message: 'No se pudo obtener registro por medio de la llave' }; }
      else {
        console.log('API: solicitudByKey: ',data);
          return data;
        }
  }  

  @UseGuards(JwtAuthGuard)
  @Get('/solAnterior/:equ')
  @ApiOperation({ summary: 'Lista solicitud por medio de la llave de la tabla'})
  @ApiResponse({
      status: HttpStatus.OK,
      description: 'Lista solicitud por medio de la llave de la tabla',
      type: [Solicitudes],
    })   
  async solAnterior( @Param('equ') v_equ: number) {
      const data = await this.solicitudesService.solAnterior(v_equ);
      if (!data) {return { message: 'No se pudo obtener registro por medio de la llave' }; }
      else {
        console.log('API: solAnterior: ',data);
          return data;
        }
  } 


  //@UseGuards(JwtAuthGuard)
  @Get('/solByEquipo/:qrEquipo')
  @ApiOperation({ summary: 'Lista solicitudes por medio de número de equipo'})
  @ApiResponse({
      status: HttpStatus.OK,
      description: 'Lista solicitud por medio de número de equipo',
      type: [Solicitudes],
    })   
  async buscaSolPorEquipo(
      @Param('qrEquipo') v_equ: string) {
      const data = await this.solicitudesService.buscaSolPorEquipo(v_equ);
      if (!data) {return { message: 'No se pudo obtener registro por medio del código del equipo' }; }
      else {
          return data;
        }
  }  

     @UseGuards(JwtAuthGuard)    
     @Put('/actualiza/:cia/:ani/:mes/:sol')
     @ApiOperation({ summary: 'Permite ACTUALIZAR registros en SOLICITUDES' })
     @ApiResponse({
         status: HttpStatus.OK,
         description: 'Permite ACTUALIZAR registros en GSI_UCL',
         type: [Solicitudes],
       })     
     async actualizaSolicitud(
      @Param('cia') v_cia: string,
      @Param('ani') v_ani: number,
      @Param('mes') v_mes: number,
       @Param('sol') v_sol: number,
       @Body() dto: Edit_Solicitud_Dto) {
         const data = await this.solicitudesService.actualizaSolicitud(v_cia, v_ani, v_mes, v_sol, dto);
         console.log('API: Actualiza: ',data);
         return { message: 'Registro actualizado', data };
     }


    //@UseGuards(JwtAuthGuard)
    @Get('/equipos/')
    @ApiOperation({ summary: 'Lista de Equipos de Transporte'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de Equipos de Transporte',
        type: [Equipos],
      })     
      async buscaTodosEquipos() {
      const data = await this.solicitudesService.buscaTodosEquipos();
      return data;
    }  

    @UseGuards(JwtAuthGuard)
    @Get('/EquipoByKey/:equCodcia/:equNoEquipo')
    @ApiOperation({ summary: 'Lista de Equipo por medio de su llave'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de Equipo por medio de su llave',
        type: [Equipos],
      })    
    async EquipoByKey(
        @Param('equCodcia') v_cia: string,
        @Param('equNoEquipo') v_equ: number,) {
        const data = await this.solicitudesService.EquipoByKey(v_cia, v_equ);
        if (!data) {return { message: 'No se pudo obtener registro por medio de la llave' }; }
        else {
            return data;
          }
      }

    //@UseGuards(JwtAuthGuard)
    @Get('/usuarios/')
    @ApiOperation({ summary: 'Lista de Usuarios que podrán validar solicitudes de transporte tanto de la Salida como en la Entrada a la Comisión'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de Usuarios que podrán validar solicitudes de transporte tanto de la Salida como en la Entrada a la Comisión',
        type: [Usuarios],
      })     
      async buscaTodosUsuarios() {
      const data = await this.solicitudesService.buscaTodosUsuarios();
      return data;
    }  

    @Get('/usuario/:dui')
    @ApiOperation({ summary: 'Consulta de Usuario por medio el DUI que podrá validar solicitudes de transporte tanto de la Salida como en la Entrada a la Comisión'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Consulta de Usuario por medio el DUI que podrá validar solicitudes de transporte tanto de la Salida como en la Entrada a la Comisión',
        type: [Usuarios],
      })     
      async buscaUsuario(@Param('dui') v_dui: string) {
        
      const data = await this.solicitudesService.buscaUsuarioDui(v_dui);
      console.log('API: GET: Usuario/DUI: ',data);
      return data;
    }     

    @UseGuards(JwtAuthGuard)
    @Post('/usuario/')
    @ApiOperation({ summary: 'Permite CREAR los registros en tabla de usuarios' })
    @ApiResponse({
     status: HttpStatus.OK,
     description: 'Permite CREAR los registros en tabla de usuarios',
     type: [Usuarios],
   })    
    async creaUsuario(@Body() datos: Create_Usuario_Dto) {
        const data = await this.solicitudesService.creaUsuario(datos);
        console.log('API: POST: Usuario ',data);
        return { message: 'Registro creado', data };
     }

     //Encuestas
     @UseGuards(JwtAuthGuard)
     @Get('/preguntas')
     @ApiOperation({ summary: 'Lista solicitud por medio de la llave de la tabla'})
     @ApiResponse({
         status: HttpStatus.OK,
         description: 'Lista solicitud por medio de la llave de la tabla',
         type: [Trs_Prg_Entity],
       })   
     async buscaPreguntas() {
         const data = await this.solicitudesService.buscaPreguntas();
         if (!data) {return { message: 'No se pudo obtener registro por medio de la llave' }; }
         else {
          console.log('API: preguntas: ',data);
             return data;
           }
     }      
 
     @UseGuards(JwtAuthGuard)
     @Get('/respuestas/:prg')
     @ApiOperation({ summary: 'Lista solicitud por medio de la llave de la tabla'})
     @ApiResponse({
         status: HttpStatus.OK,
         description: 'Lista solicitud por medio de la llave de la tabla',
         type: [Trs_Orc_Entity],
       })   
     async buscaRespuestas(
      @Param('prg') v_prg: number,
     ) {
         const data = await this.solicitudesService.buscaRespuestas(v_prg);
         if (!data) {return { message: 'No se pudo obtener registro por medio de la llave' }; }
         else {
          console.log('API: respuestas: ',data);
             return data;
           }
     }      

     @UseGuards(JwtAuthGuard)
     @Post('/encuesta/')
     @ApiOperation({ summary: 'Permite CREAR encuesta' })
     @ApiResponse({
      status: HttpStatus.OK,
      description: 'Permite CREAR los registros en tabla de usuarios',
      type: [Trs_Ree_Entity],
    })    
     async creaEncuesta(@Body() datos: Create_Encuesta_Dto) {
         const data = await this.solicitudesService.creaEncuesta(datos);
         console.log('API: POST:guarda encuesta: ',data);
         return { message: 'Registro creado', data };
      }

      @Get('/correoEncuesta/:cia/:ani/:mes/:cod') 
      @ApiOperation({ summary: 'Correo encuesta' })
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Coreo encuestas',
        })     
      getSP(
          @Param('cia') v_cia: string,
          @Param('ani') v_ani: number,
          @Param('mes') v_mes: number,
          @Param('cod') v_cod: number,){
          const correo = this.solicitudesService.callSPCarga(v_cia, v_ani, v_mes, v_cod);
          console.log('API: get correo encuesta: ',correo);
          return { message: 'Correo enviado',correo};
        }
     
      @Get('/justificaciones/')
      @ApiOperation({ summary: 'Lista de Justificaciones de llenado de encuesta'})
      @ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de Justificaciones de llenado de encuesta',
          type: [Usuarios],
        })     
        async buscaJustificaciones() {
        const data = await this.solicitudesService.buscaJustificaciones();
        return data;
      } 
}
