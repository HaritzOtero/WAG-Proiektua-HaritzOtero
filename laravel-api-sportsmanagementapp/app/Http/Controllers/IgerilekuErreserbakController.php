<?php

namespace App\Http\Controllers;
use App\Models\IgeilekuErreserba; 
use Illuminate\Http\Request;
use App\Models\IgerilekuErreserba;
use Carbon\Carbon;

class IgerilekuErreserbakController extends Controller
{
    public function index()
    {
        return IgerilekuErreserba::all();
    }
    public function getOrduakKaleakin($kalea_id, $eguna) {
        // Obtener las horas reservadas para la calle específica ($kalea) en un día específico ($eguna)
        $horasReservadas = IgerilekuErreserba::where('kalea_id', $kalea_id)
                                             ->where('igerileku_erreserba_eguna', $eguna)
                                             ->pluck('igeileku_erreserba_ordua')
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
    public function getNireIgerilekuErreserbakUsuario($usuario_id){
        
        $igerilekuErreserbaTotala = IgerilekuErreserba::where('user_id', $usuario_id)->get();
        
        $igerilekuErreserbaTotala->load('kalea');
        
        return response()->json($igerilekuErreserbaTotala,201);       
    }
    public function getIgerilekuErreserbakUsuario($usuario_id){
        $igerilekuErreserbaTotala = IgerilekuErreserba::where('user_id', $usuario_id)->count();
        return $igerilekuErreserbaTotala;                       
    }
    public function getIgerilekuErreserbakUsuarioEguneko($usuario_id,$eguna){
        $horasReservadas = IgerilekuErreserba::where('user_id', $usuario_id)->where('igerileku_erreserba_eguna', $eguna)->count();
        return response()->json($horasReservadas,201);       
    }
    public function ezabatuZaharrak(){
        // Obtener la fecha de hoy formateada
        $hoy = Carbon::today()->toDateString();
        
        // Eliminar los registros anteriores a la fecha de hoy
        IgerilekuErreserba::whereDate('igerileku_erreserba_eguna', '<', $hoy)
            ->delete();
    }
    public function store(Request $request)
    {
        $igerilekuErreserba = IgerilekuErreserba::create($request->all());

        return  response()->json($igerilekuErreserba,201);
    }

    public function show(IgerilekuErreserba $igerilekuErreserba)
    {
        return $igerilekuErreserba;
    }
    public function update(Request $request, IgerilekuErreserba $igerilekuErreserba)
    {
        $igerilekuErreserba->update($request->all());
        return response()->json($igerilekuErreserba,200);
    }
    public function delete($id)
{
    $ogerilekuErreserba = IgerilekuErreserba::find($id);

    if (!$ogerilekuErreserba) {
        return response()->json(['error' => 'La reserva no existe'], 404);
    }

    $ogerilekuErreserba->delete();

    return response()->json(null, 204);
}
}
