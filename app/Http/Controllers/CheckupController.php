<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Action;
use App\Models\Result;
use App\Models\Note;
use Illuminate\Support\Facades\DB;

class CheckupController extends Controller
{
    /**
     * Store a new checkup record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        dd($request);
    }

    /**
     * Update an existing checkup record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $actionId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $actionId)
    {
       
    }
}