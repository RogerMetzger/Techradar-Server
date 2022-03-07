export class Permission extends Array<string> {
    static CREATE = ['Techlead', 'CTO'];
    static READ = ['Techlead', 'CTO'];
    static UPDATE = ['Techlead', 'CTO'];
    static PUBLISH = ['CTO'];
    static DELETE = ['CTO'];
    static MANAGE = ['CTO'];
}