export class Utils{
    private static serve;

    static isServing():boolean{
        const args = process.argv.slice(1);
        if(this.serve === null){
            Utils.serve = args.some(val => val === "--serve");
        }
        return this.serve;
    }
}