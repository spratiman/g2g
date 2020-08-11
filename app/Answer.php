<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = [
        'questioniar_id', 'option','value','question_id',
    ];

    public function questioniar()
    {
        return $this->belongsTo(Questioniar::class);
    }
}
