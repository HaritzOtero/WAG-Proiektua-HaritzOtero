<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GimnasioErreserbak;
class GimnasioErreserbakController extends Controller
{
    public function index()
    {
        return GimnasioErreserbak::all();
    }

    public function store(Request $request)
    {
        $gimnasioErreserba = GimnasioErreserbak::create($request->all());

        return  response()->json($gimnasioErreserba,201);
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
    public function show(GimnasioErreserbak $gimnasioErreserba)
    {
        return $gimnasioErreserba;
    }
    public function update(Request $request, GimnasioErreserbak $gimnasioErreserba)
    {
        $gimnasioErreserba->update($request->all());
        return response()->json($gimnasioErreserba,200);
    }
    public function delete(Request $request, GimnasioErreserbak $gimnasioErreserba)
{
    $gimnasioErreserba->delete(); // Eliminar la Galdera
    return response()->json(null, 204); // Retornar una respuesta con código 204 (No Content)
}
}
