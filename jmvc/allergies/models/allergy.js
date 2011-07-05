/**
 * @tag models, home
 * Wraps backend data services. No UD for now
 */
$.Model.extend('Allergies.Models.Allergy',
/* @Static */
{
    /**
     * Retrieves data from your backend services. Sorts by dateMeasured desc by default. Can't use
     * parameters to the api call to do this if using test data since all data have the same created_at in the db
     */
    findAll: function(params, success, error) {
        var self = this;
        $.ajax({
            url: '/apps/allergies/allergies',
            type: 'get',
            dataType: 'json',
            data: params,
            success: this.callback(function(data, textStatus, xhr) {
                // sort data by <Report><Item><dateMeasured>
                // data.reports = _(data.reports).sortBy(function(r){ return(r.item.date_measured); }).reverse();
                success(self.wrapMany(data));
                //success(data['summary'], self.wrapMany(data));
            }),
            error: error
        });
    },
    
    
    /**
     * Create or update an allergy
     */
    create: function(params, success, error) {
        $.ajax({
            url: '/apps/allergies/allergies/new',
            type: 'post',
            dataType: 'text',
            data: params,
            success: this.callback(function(data, textStatus, xhr) {
                if (success) {
                    success(data, textStatus);
                }
            }),
            error: error
        });
    },
    
    update: function(id, params, success, error) {
        if (!id) {
            return this.create(params, success, error);
        }
        
        // ...
    },
},
/* @Prototype */
{
    /**
     * Get the history
     */
    loadHistory: function(success, error) {
        $.ajax({
            url: '/apps/allergies/allergies/' + this.meta.id + '/history/',
            type: 'get',
            dataType: 'json',
            success: this.callback(function(data, textStatus, xhr) {
                if (success) {
                    success(data, textStatus);
                }
            }),
            error: error
        }); 
    },
})