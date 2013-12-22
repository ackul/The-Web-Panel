function debugBoxes( data , offset , length , tablength , is_hex  )
{
		var charmappedarray = [ a , b, c , d , e, f, g , h , i , j , k , l , m , n , o , p , q, r , s , t , u , v , w , x , y , z ];
		printinhexadecimal = is_hex ;
		
	try{
		if( (offset + 4) > length  )
		{
			throw "unable to read next box length ";
		}
		var boxlength = (( data[offset ] << 24 ) | ( data[offset ] << 16 ) | ( data[offset ] << 8 )| ( data[offset ] )  )
		integertohex( arr , offset , len )
		offset += 4 ;
		if( (offset +  boxlength)  > length  )
		{
			throw "insufficient data length = " + length ;
		}
		if( ( offset + 4) > length  )
		{
			throw "unable to read next box type ";
		}
		var i = 0 ;
		var boxtype="";
		while( i< 4 )
		{
			
			var temp = data[offset++];
			if( (temp >= 97) && ( temp <=122))
			{
				boxtype += charmappedarray[ temp- 97 ];
			}
		}
		
		if( boxtype == "ftype" )
		{
			
		}
		else if( boxtype == "moov" )
		{
			
		}
		else
		{
			printdata( "unimplement box============" + boxtype , 0 );
		}
		
		
		
	}catch(error )
	{
		printdata( "============" +error  , 0 );
	}
	
	
	
	function  printdata( str , tablength )
	{
		var tempstr ; 
		for( var i = 0 ; i < tablength ;i++)
		{
			tempstr = "   "  ;	
		}
		tempstr = "\n" + tempstr  ;
		var arr = str.split( /\n/g  )
		var tstr ="";
		for( var i = 0 ; i < arr.length ;i ++)
		{
			tstr = tstr + tempstr  + arr[i]  ;
		}
		console.log( tstr );
	}
	function integertohex( arr , offset , len )
	{
		if( printinhexadecimal == true )
		{
			var str = "";
			if( len > 0 )
			{
				for( var i = 0 ; i <  len ; i++)
				{
					str += Number(arr[offset + i ]).toString(16);
				}
			}
			
			else{
				str +=  Number(arr).toString(16); ;
			}
			return str ;
		}
		else{
			var str = "";
			if( len > 0 )
			{
				for( var i = 0 ; i <  len ; i++)
				{
					str += arr[offset + i ];
				}
			}
			
			else{
				str += arr ;
			}
			return str ;
		}
		
	}

}
