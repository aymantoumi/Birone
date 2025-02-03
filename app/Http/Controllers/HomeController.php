<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Patient;
use App\Models\Action;

class HomeController extends Controller
{
    public function index()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // Generate all dates for the current month
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $allDates = [];
        for ($date = $startOfMonth; $date->lte($endOfMonth); $date->addDay()) {
            $allDates[] = $date->format('Y-m-d');
        }

        // Fetch patients per day
        $patientsPerDay = Patient::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();

        // Fetch actions per day
        $actionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();

        // Fetch finished actions per day
        $finishedActionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('Status', true)
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();

        // Fetch not finished actions per day
        $notFinishedActionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('Status', false)
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();


        // Merge with all dates to ensure all days are represented
        $patientsPerDay = array_merge(array_fill_keys($allDates, 0), $patientsPerDay);
        $actionsPerDay = array_merge(array_fill_keys($allDates, 0), $actionsPerDay);
        $finishedActionsPerDay = array_merge(array_fill_keys($allDates, 0), $finishedActionsPerDay);
        $notFinishedActionsPerDay = array_merge(array_fill_keys($allDates, 0), $notFinishedActionsPerDay);
        // dd($notFinishedActionsPerDay, $finishedActionsPerDay);

        return inertia('Dashboard', [
            'patientsPerDay' => $patientsPerDay,
            'actionsPerDay' => $actionsPerDay,
            'finishedActionsPerDay' => $finishedActionsPerDay,
            'notFinishedActionsPerDay' => $notFinishedActionsPerDay,
        ]);
    }
}
