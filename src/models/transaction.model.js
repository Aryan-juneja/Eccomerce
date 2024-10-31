import mongoose,{Schema} from "mongoose";

const transactionSchema=new Schema({
    amount:{type:Number,required:true},
    paymentId:{type:String,required:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    transactionDate: {
        type: Date,
        default: Date.now,
      },
})

const TransactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema);
export default TransactionModel;