<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActionsType extends Model
{
    protected $table = 'actions_types';
    protected $fillable = [
        'type_name',
    ];


    public function actions()
    {
        return $this->hasMany(Action::class, 'actions_types_id');
    }
}
