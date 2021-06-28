import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class ChildComponent extends Component {

    @action
    callParent(){
        this.sendAction("callChild");
    }
   

}
