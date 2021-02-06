$("#symptoms").change(function(){
    var select=$('#symptoms').val();
    var parameters = { search: $(this).val() };
    $.get( '/knowdoctor',parameters, function(data) {
       return data
      });
      var list=[
        {name:"Dr.AK",symtoms:"lungs Problem",time:"3.00 AM"},
        {name:"Dr.NK",symtoms:"eye Problem",time:"6.00 PM"},
        {name:"Dr.PK",symtoms:"heart Problem",time:"10.00 AM"},
        {name:"Dr.MK",symtoms:"sugar Problem",time:"9.00 PM"},
        {name:"Dr.CK",symtoms:"ear Problem",time:"12.00 PM"}
    ]
    const n=list.filter(function(data){
        if(data.symtoms == select){
            return data.name;
            return data.time;
        }
        else{
            return null;
        }
    });
    n.forEach(function(list){
        var name=$('#drname').val(list.name);
        var name=$('#time').val(list.time);
    })
    console.log(n);

})
      
    
