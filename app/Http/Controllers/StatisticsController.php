<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $male_count = Patient::where('gender', 'male')
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();

        $female_count = Patient::where('gender', 'female')
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();

        $actionTypeCounts = Action::select('actions_types_id', DB::raw('count(*) as total'))
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy('actions_types_id')
            ->with('actionType')
            ->get();

        $actionsByStatus = Action::select('actions_types_id', 'Status', DB::raw('count(*) as total'))
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy('actions_types_id', 'Status')
            ->with('actionType')
            ->get();

        $paymentsByActionType = Action::select('actions_types_id', DB::raw('sum(payment) as total_payment'))
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy('actions_types_id')
            ->with('actionType')
            ->get();

        return inertia('Statistics/Index', [
            'male_count' => $male_count,
            'female_count' => $female_count,
            'actionTypeCounts' => $actionTypeCounts,
            'actionsByStatus' => $actionsByStatus,
            'paymentsByActionType' => $paymentsByActionType,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
