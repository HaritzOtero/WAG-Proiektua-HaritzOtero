<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GimnasioErreserbak;
use App\Models\Gela;
use Carbon\Carbon;

class GimnasioErreserbakController extends Controller
{
    public function index()
    {
        return GimnasioErreserbak::all();
    }

    public function store(Request $request)
    {
        $gimnasioErreserba = GimnasioErreserbak::create($request->all());

        return  response()->json($gimnasioErreserba, 201);
    }

    public function getOrduakGelakin($gela_id, $eguna) {
        // Obtener las horas reservadas para la calle específica ($kalea) en un día específico ($eguna)
        $horasReservadas = GimnasioErreserbak::where('gela_id', $gela_id)
                                             ->where('gym_erreserba_eguna', $eguna)
                                             ->pluck('gym_erreserba_ordua')
                                             ->toArray();
        
        // Generar todas las horas del día desde las 8:00 hasta las 21:00
        $horasDelDia = [];
        $horaInicio = 8;
        $horaFin = 21;
        for ($hora = $horaInicio; $hora <= $horaFin; $hora++) {
            // Agregar ceros a la izquierda si es necesario (para que el formato sea consistente)
            $horaFormateada = str_pad($hora, 2, '0', STR_PAD_LEFT);
            
            // Generar la hora en formato HH:00
            $horaCompleta = $horaFormateada . ':00';
    
            // Verificar si la hora está reservada y si no lo está, agregarla al array
            if (!in_array($horaCompleta, $horasReservadas)) {
                $horasDelDia[] = $horaCompleta;
            }
        }
    
        // Retornar el array de horas disponibles
        return response()->json($horasDelDia, 200);
    }

    public function getPertsonaKopuruErreserbatuta($gela_id, $eguna, $ordua){
        // Contar el número de reservas para la gela específica ($gela_id), en el día específico ($eguna) y a la hora específica ($ordua)
        $reservasCount = GimnasioErreserbak::where('gela_id', $gela_id)
                                            ->where('gym_erreserba_eguna', $eguna)
                                            ->where('gym_erreserba_ordua', $ordua)
                                            ->count();
        
        // Retornar el número de reservas encontradas
        return $reservasCount;
    }

    public function getGimnasioErreserbakUsuario($usuario_id){
        $gimnasioErreserbaTotala = GimnasioErreserbak::where('user_id', $usuario_id)->count();
        return $gimnasioErreserbaTotala;                       
    }

    public function getNireGimnasioErreserbakUsuario($usuario_id)
    {
        // Obtener las reservas del gimnasio para el usuario
        $gimnasioErreserbaTotala = GimnasioErreserbak::where('user_id', $usuario_id)->get();

        // Cargar la información relacionada de la gela para cada reserva
        $gimnasioErreserbaTotala->load('gela');

        // Retornar la respuesta JSON
        return response()->json($gimnasioErreserbaTotala, 201);
    }

    public function ezabatuZaharrakGym(){
        // Obtener la fecha de hoy formateada
        $hoy = Carbon::today()->toDateString();
        
        // Eliminar los registros anteriores a la fecha de hoy
        GimnasioErreserbak::whereDate('gym_erreserba_eguna', '<', $hoy)
            ->delete();
    }

    public function getGimnasioErreserbakUsuarioEguneko($usuario_id,$eguna){
        $horasReservadas = GimnasioErreserbak::where('user_id', $usuario_id)
                                              ->where('gym_erreserba_eguna', $eguna)
                                              ->count();
        return response()->json($horasReservadas, 201);       
    }

    public function show(GimnasioErreserbak $gimnasioErreserba)
    {
        return $gimnasioErreserba;
    }

    public function update(Request $request, GimnasioErreserbak $gimnasioErreserba)
    {
        $gimnasioErreserba->update($request->all());
        return response()->json($gimnasioErreserba, 200);
    }

    public function delete($id)
    {
        $gimnasioErreserba = GimnasioErreserbak::find($id);

        if (!$gimnasioErreserba) {
            return response()->json(['error' => 'La reserva no existe'], 404);
        }

        $gimnasioErreserba->delete();

        return response()->json(null, 204);
    }
}
