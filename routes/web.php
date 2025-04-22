<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\ActionsTypeController;
use App\Http\Controllers\categories;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LabResultController;
use App\Http\Controllers\MedicationClassController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\Settings;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CheckupController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified', 'administrator:admin'])->group(function () {
    Route::resource('categories', categories::class);
    Route::put('actions/{action}', [ActionController::class, 'update'])->name('actions.update');
    Route::resource('Statistics', StatisticsController::class);
    Route::resource('actionType', ActionsTypeController::class);
    Route::get('/settings', [Settings::class, 'index'])->name('settings.index');
    Route::resource('usersManagement', UsersController::class);
    Route::resource('medicationClass', MedicationClassController::class);
    Route::resource('lab_results', LabResultController::class);
    Route::resource('scans', ScannerController::class);
    Route::resource('check_up', CheckupController::class);
    Route::resource('medications', MedicationController::class);
    Route::post('/Patients/{patient}', [ResultController::class, 'store'])->name('result.store');
    Route::put('/checkups/{actionId}', [ResultController::class, 'update'])->name('result.update');
    Route::get('/results/{action_id}', [ResultController::class, 'show']);
});

Route::middleware(['auth', 'verified',])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'Index'])->name('dashboard');
    Route::resource('Patients', PatientController::class);
    Route::resource('patients.actions', ActionController::class)->shallow();
    Route::post('/patients/{patient}/change-status', [ActionController::class, 'changeStatus'])->name('action.changeStatus');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
