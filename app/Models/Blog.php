<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory,SoftDeletes;
    protected $table='blog';

    public function comment(){
        return $this->hasMany(Comment::class,'BlogID','id');
    }

    public function tag(){
        $array=array();
        foreach(json_decode($this->tag) as $item){
            $tag=Tag::find($item->id);
            if($tag){
                array_push($array,$tag);
            }
        }
        return $array;
    }

    public function addTag($name){
        $temp=json_decode($this->tag);
        $tag=Tag::where('name',$name)->first();
        if(!$tag && $name){
            $tag=new Tag();
            $tag->name=$name;
            $tag->color='#' . dechex(rand(0,10000000));
            $tag->save();
        }
        if($tag && count($temp)<=4){
            $result=true;
            foreach($temp as $item){
                if($item->id==$tag->id){
                    $result=false;
                    break;
                }
            }
            if($result){
                array_push($temp,json_decode('{"id":'.$tag->id.'}'));
            }
        }
        return json_encode($temp);
    }

    public function deleteTag($id){
        $temp=json_decode($this->tag);
        if($temp){
            $result=false;
            foreach($temp as $key=>$item){
                if($item->id==$id){
                    $result=$key;
                    break;
                }
            }
            if($result){
                array_splice($temp, $key, 1);
            }
        }
        return json_encode($temp);
    }
}
