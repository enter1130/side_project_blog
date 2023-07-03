<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory,SoftDeletes;
    protected $table='tag';

    public function tag(){
        $result=array();
        foreach(Tag::all() as $item){
            array_push($result,array('label'=>$item->name,'value'=>$item->name));
        }

        return $result;
    }
}
