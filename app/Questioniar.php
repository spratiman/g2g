<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questioniar extends Model
{
    protected $fillable = [
        'user_id', 'ip_address','answers','recommendation','status','state'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }
}
