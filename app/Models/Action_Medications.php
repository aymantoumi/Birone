<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action_Medications extends Model
{
    protected $table = 'action__medications';

    protected $fillable = [
        'action_id',
        'medication_id',
    ];

    public function action()
    {
        return $this->belongsTo(Action::class);
    }

    public function medication()
    {
        return $this->belongsTo(Medication::class);
    }
}
