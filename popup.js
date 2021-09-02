$(function(){
    //get the chrome api storage value when the extension is loaded
    chrome.storage.sync.get(['total', 'limit'], function(budget){
        $('#total').text(budget.total);
        $('limit').text(budget.limit);
    })

    //When the user provides the spend, 
    $('#SpendAmount').click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            var newTotal = 0
            if(budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){

                if(amount && newTotal >= budget.limit){
                    var NotifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit Reached',
                        message: 'oh oh! Looks like you have reach your limit!'
                    }
                    chrome.notifications.create('limitNotif', NotifOptions);

                }

            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});