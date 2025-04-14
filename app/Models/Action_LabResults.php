<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action_LabResults extends Model
{
    protected $table = 'action__lab_results';

    protected $fillable = [
        'action_id',
        'lab_result_id',
    ];

    public function action()
    {
        return $this->belongsTo(Action::class);
    }

    public function lab_resultls()
    {
        return $this->belongsTo(LabResult::class);
    }
}
