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

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'results', 'check_up_id', 'action_id')
                    ->withPivot('created_at', 'updated_at'); 
    }

}
 