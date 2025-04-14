<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class check_up extends Model
{
    protected $table = 'check_ups';

    protected $fillable = [
        'check_up',
        'action_id',
    ];

    public function action()
    {
        return $this->belongsTo(Action::class, 'action_id');
    }

}
 